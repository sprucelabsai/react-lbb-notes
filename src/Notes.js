import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
	Dialog,
	Input,
	Button,
	Form,
	Select,
	BotText,
	ImageCropper,
	Tabs,
	TabPane,
	SectionHeading,
	Switch,
	Loader,
	List,
	ListItem,
	SubmitWrapper,
	sharable
} from 'react-sprucebot'

import isDblTouchTap from './isDblTouchTap'
import injectTapEventPlugin from 'react-tap-event-plugin'
import styled from 'styled-components'
import * as _ from 'lodash'
const ImageNote = styled.img`
	width: 100%;
`

class Notes extends Component {
	constructor(props) {
		super(props)
		this.state = {
			creating: false,
			notesLoading: true,
			togglingPinned: false,
			notes: [],
			pinned: [],
			errorMessage: false,
			note: {
				isPinned: false,
				isPrivate: this.props.user.role === 'teammate',
				body: ''
			},
			uploadingImage: false,
			crop: {
				x: 20,
				y: 20,
				width: 30,
				height: 30
			}
		}

		this.handleChange = this.handleChange.bind(this)
		this.togglePinned = this.togglePinned.bind(this)
	}
	async refreshNotes() {
		try {
			let { notes, pinned } = await this.props.actions.notes.get(
				this.props.user.UserId
			)

			await this.setState({
				pinned: pinned ? [pinned] : [],
				notes: notes,
				notesLoading: false,
				errorMessage: '',
				togglingPinned: false
			})
		} catch (error) {
			console.log('refreshNotes', error)
			await this.setState({
				notesLoading: false,
				errorMessage:
					error.friendlyReason || this.props.lang.getText('unknownError')
			})
		}
	}
	async componentWillMount() {
		try {
			await injectTapEventPlugin()
		} catch (e) {
			// Do nothing, just preventing error
			// Best solution so far on next.js issues - http://bit.ly/2DjREQm
		}
		await this.refreshNotes()
	}

	componentDidUpdate(prevProps, prevState) {}

	async handleChange(key, value) {
		await this.setState(prevState => {
			prevState.note[key] = value
			return prevState
		})
	}
	async resetNoteForm() {
		this.setState(prevState => {
			prevState.note.body = ''
			prevState.note.isPinned = false
			prevState.note.isPrivate = this.props.user.role === 'teammate'
			return prevState
		})
	}

	async handleSubmit(e) {
		e.preventDefault()
		if (!this.state.note.body || this.state.creating) {
			return
		}
		try {
			this.setState({ creating: true })
			let {
				note: { isPinned, isPrivate, body }
			} = this.state
			let { user } = this.props
			let resp = await this.props.actions.notes.create({
				userId: user.UserId,
				isPinned,
				isPrivate,
				body
			})
			const prevNotes = Array.from(this.state.notes)
			if (resp.isPinned) {
				this.props.user.pinned = resp
			} else {
				await this.setState({ notes: [resp].concat(prevNotes) })
			}
			this.refreshNotes()
			await this.props.onSubmit()
			this.resetNoteForm()
			this.setState({ creating: false })
		} catch (error) {
			console.log('submit', error)
			this.setState({
				errorMessage:
					error.friendlyReason || this.props.lang.getText('unknownError')
			})
		} finally {
		}
	}
	async togglePinned(note) {
		try {
			// Toggling Image Notes is not currently supported
			if (note.type === 'image' || note.isPrivate) {
				this.setState({
					errorMessage: this.props.lang.getText('privateAndImageWarn')
				})
				return
			}
			this.setState({ togglingPinned: true })
			let { user } = this.props

			let resp = await this.props.actions.notes.togglePinned(note, user.UserId)
			if (resp.isPinned) {
				//TODO: Remove this anti pattern code
				this.props.user.pinned = resp
			} else {
				//TODO: Remove this anti pattern code
				this.props.user.pinned = null
			}
			await this.refreshNotes()
		} catch (error) {
			this.setState({
				errorMessage:
					error.friendlyReason || this.props.lang.getText('unknownError')
			})
		}
	}
	async handlePrivateToggle(value) {
		if (value) {
			this.handleChange('isPinned', false)
		}
		this.handleChange('isPrivate', value)
	}

	notesList(notes) {
		return notes.map((note, idx) => {
			return (
				<ListItem
					key={`item-${idx}`}
					onClick={async e => {
						// == onDblTouchTap
						if (isDblTouchTap(e)) {
							await this.togglePinned(note)
						}
					}}
				>
					<BotText>
						{note.isPinned ? '📌 ' : ''}
						{note.isPrivate ? '🤐 ' : ''}
						{note.type === 'image' ? (
							<ImageNote src={note.body} />
						) : (
							<strong>{note.body}</strong>
						)}
						- {note.signature}
					</BotText>
				</ListItem>
			)
		})
	}
	async onTakePhoto() {
		if (!this.state.uploadingImage) {
			this.setState({ uploadingImage: true })
		}
	}

	async onSaveImageNote(base64ImageNote) {
		try {
			let {
				note: { isPinned, isPrivate }
			} = this.state
			let { user } = this.props
			await this.props.actions.notes.saveNoteImage({
				userId: user.UserId,
				isPinned,
				isPrivate,
				body: base64ImageNote
			})
			this.resetNoteForm()
			this.setState({ creating: false, uploadingImage: false })
			this.props.onSubmit()
		} catch (error) {
			console.log('onsaveimagenote', error)
			this.setState({
				errorMessage:
					error.friendlyReason || this.props.lang.getText('unknownError')
			})
		}
	}
	render() {
		const { lang, auth, config, ...props } = this.props

		return (
			<div {...props}>
				<Dialog
					show={!!this.state.errorMessage}
					onTapClose={() => {
						this.setState({ errorMessage: false })
					}}
					ref={ref => (this.eDialog = ref)}
				>
					<div>
						<BotText>{this.state.errorMessage}</BotText>
						<Button
							primary
							onClick={() => {
								this.setState({ errorMessage: '' })
							}}
							type="button"
						>
							{lang.getText('errorCloseBtn')}
						</Button>
					</div>
				</Dialog>
				{!this.state.notesLoading &&
					!this.state.errorMessage &&
					this.state.pinned.length === 0 &&
					this.state.notes.length === 0 && (
						<BotText>{lang.getText('noNotesFound')}</BotText>
					)}

				{this.state.notes && (
					<List>
						{this.notesList(this.state.pinned.concat(this.state.notes))}
					</List>
				)}
				{(this.state.notesLoading || this.state.togglingPinned) && <Loader />}

				<Form onSubmit={e => this.handleSubmit(e)}>
					<List>
						{!this.state.uploadingImage && (
							<ListItem>
								<SectionHeading>{lang.getText('addTextNote')}</SectionHeading>
								<Input
									multiline
									placeholder={lang.getText('notePlaceholder')}
									onChange={(value, e) => {
										this.handleChange('body', value)
									}}
									value={this.state.note.body}
								/>
							</ListItem>
						)}
						{config.ENABLE_IMAGE_UPLOADS === 'true' &&
							this.state.note.body === '' && (
								<ListItem onClick={this.onTakePhoto.bind(this)}>
									<ImageCropper
										crop={this.state.crop}
										uploadButtonText={lang.getText('uploadButtonText')}
										onSave={this.onSaveImageNote.bind(this)}
									/>
								</ListItem>
							)}
						{!this.state.note.isPrivate &&
							!this.state.uploadingImage && (
								<ListItem
									title={lang.getText('pinnedLabel')}
									subtitle={lang.getText('pinnedSubLabel')}
									rightInput={
										<Switch
											on={this.state.note.isPinned}
											onChange={value => this.handleChange('isPinned', value)}
										/>
									}
								/>
							)}
						{auth.role === 'owner' && (
							<ListItem
								title={lang.getText('privateLabel')}
								subtitle={lang.getText('privateSubLabel')}
								rightInput={
									<Switch
										on={this.state.note.isPrivate}
										onChange={value => this.handlePrivateToggle(value)}
									/>
								}
							/>
						)}
					</List>
					<SubmitWrapper>
						<Button
							primary
							busy={this.state.creating}
							disabled={!this.state.note.body}
							type="submit"
						>
							{lang.getText('saveNote')}
						</Button>
					</SubmitWrapper>
				</Form>
			</div>
		)
	}
}

Notes.propTypes = {
	user: PropTypes.object.isRequired, // user we are editing
	auth: PropTypes.object.isRequired,
	lang: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
	config: PropTypes.object,
	onSubmit: PropTypes.func.isRequired
}

Notes.defaultProps = {
	onSubmit: () => {},
	config: {
		ENABLE_IMAGE_UPLOADS: true
	}
}

export default sharable({
	actionsToEvents: {
		notes: {
			get: 'little-black-book:get-notes',
			create: 'little-black-book:create-note',
			togglePinned: 'little-black-book:toggle-pinned',
			saveNoteImage: 'little-black-book:add-image',
		}
	}
},Notes)
