//Libraries needed to be installed:
//npm install expo-av - handles mp3 audio playback

import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'

//handles playing icons
import { Ionicons } from 'react-native-vector-icons'
//handles mp3 audio playback
import { Audio } from 'expo-av'

//Array of Songs that Handles Music Source
const audioBookPlaylist = [
	{
		title: 'On Top of the World',
		author: 'Imagine Dragons',
		source: 'Librivox',
		uri: 'https://firebasestorage.googleapis.com/v0/b/music-royale-a3aaa.appspot.com/o/songs%2FImagine%20Dragons%20-%20On%20Top%20Of%20The%20World%20(Lyrics).mp3?alt=media&token=5cc61986-cc58-4e96-b6c4-bf236139cc58',
		imageSource: 'https://firebasestorage.googleapis.com/v0/b/music-royale-a3aaa.appspot.com/o/Album%20Covers%2FImagine%20Dragons%20Album%20Cover.jpg?alt=media&token=8e9f5066-58cc-45fd-a78b-c9ae5fce5eea'
	},
	{
		title: 'Radioactive',
		author: 'Imagine Dragons',
		source: 'Librivox',
		uri: 'https://firebasestorage.googleapis.com/v0/b/music-royale-a3aaa.appspot.com/o/songs%2FImagine%20Dragons%20-%20Radioactive.mp3?alt=media&token=33d9b433-b027-4ccd-8df6-f649a4513155',
		imageSource: 'https://firebasestorage.googleapis.com/v0/b/music-royale-a3aaa.appspot.com/o/Album%20Covers%2FImagine%20Dragons%20Album%20Cover.jpg?alt=media&token=8e9f5066-58cc-45fd-a78b-c9ae5fce5eea'
	},
	{
		title: 'Demons',
		author: 'Imagine Dragons',
		source: 'Librivox',
		uri: 'https://firebasestorage.googleapis.com/v0/b/music-royale-a3aaa.appspot.com/o/songs%2FImagine%20Dragons%20-%20Demons.mp3?alt=media&token=a7e51693-af9d-4ec3-86b6-140c48755601',
		imageSource: 'https://firebasestorage.googleapis.com/v0/b/music-royale-a3aaa.appspot.com/o/Album%20Covers%2FImagine%20Dragons%20Album%20Cover.jpg?alt=media&token=8e9f5066-58cc-45fd-a78b-c9ae5fce5eea'
	},
	{
		title: 'We Will Rock You',
		author: 'Queen',
		source: 'Librivox',
		uri:'https://firebasestorage.googleapis.com/v0/b/music-royale-a3aaa.appspot.com/o/songs%2FQueen%20-%20We%20Will%20Rock%20You%20(Official%20Video).mp3?alt=media&token=8cb96b90-3c88-4da0-92e7-a9de4da550bf',
		imageSource: 'https://firebasestorage.googleapis.com/v0/b/music-royale-a3aaa.appspot.com/o/Album%20Covers%2FQueenAlbumCover.jpg?alt=media&token=f67078d9-bd4a-4939-ae19-635070c84844'
	},
	{
		title: 'Bohemian Rhapsody',
		author: 'Queen',
		source: 'Librivox',
		uri:'https://firebasestorage.googleapis.com/v0/b/music-royale-a3aaa.appspot.com/o/songs%2FQueen%20%E2%80%93%20Bohemian%20Rhapsody%20(Official%20Video%20Remastered).mp3?alt=media&token=597a54bb-a574-43c2-987d-bfef33d08b98',
		imageSource: 'https://firebasestorage.googleapis.com/v0/b/music-royale-a3aaa.appspot.com/o/Album%20Covers%2FQueenAlbumCover.jpg?alt=media&token=f67078d9-bd4a-4939-ae19-635070c84844'
	},
	{
		title: 'A Day in the Life',
		author: 'The Beatles',
		source: 'Librivox',
		uri:'https://firebasestorage.googleapis.com/v0/b/music-royale-a3aaa.appspot.com/o/songs%2FThe%20Beatles%20-%20A%20Day%20In%20The%20Life.mp3?alt=media&token=87b7c1d7-694c-4e49-89e3-0427f2ff1fa2',
		imageSource: 'https://firebasestorage.googleapis.com/v0/b/music-royale-a3aaa.appspot.com/o/Album%20Covers%2FBeatlesAlbum.jpg?alt=media&token=4e42e387-5277-492d-a901-3aa6e4b8ed46'
	},
	{
		title: 'And I Love Her',
		author: 'The Beatles',
		source: 'Librivox',
		uri:'https://firebasestorage.googleapis.com/v0/b/music-royale-a3aaa.appspot.com/o/songs%2FThe%20Beatles%20-%20And%20I%20Love%20Her%20(Official%20Music%20Video).mp3?alt=media&token=70d7b4f4-cac9-4a6f-8129-f19e5f809b18',
		imageSource: 'https://firebasestorage.googleapis.com/v0/b/music-royale-a3aaa.appspot.com/o/Album%20Covers%2FBeatlesAlbum.jpg?alt=media&token=4e42e387-5277-492d-a901-3aa6e4b8ed46'
	},
	{
		title: 'Dont Let Me Down',
		author: 'The Beatles',
		source: 'Librivox',
		uri:'https://firebasestorage.googleapis.com/v0/b/music-royale-a3aaa.appspot.com/o/songs%2FThe%20Beatles%20-%20Dont%20Let%20Me%20Down.mp3?alt=media&token=59d17613-89f9-4ed9-948b-3088e8c07270',
		imageSource: 'https://firebasestorage.googleapis.com/v0/b/music-royale-a3aaa.appspot.com/o/Album%20Covers%2FBeatlesAlbum.jpg?alt=media&token=4e42e387-5277-492d-a901-3aa6e4b8ed46'
	},
	{
		title: 'A Sky Full of Stars',
		author: 'Coldplay',
		source: 'Librivox',
		uri:'https://firebasestorage.googleapis.com/v0/b/music-royale-a3aaa.appspot.com/o/songs%2FColdplay%20-%20A%20Sky%20Full%20Of%20Stars%20(Official%20Video).mp3?alt=media&token=f75f13d2-5d9b-4259-9d87-ede58b302d7a',
		imageSource: 'https://firebasestorage.googleapis.com/v0/b/music-royale-a3aaa.appspot.com/o/Album%20Covers%2FColdplayAlbumCover.jpg?alt=media&token=0612ca53-05ac-4cc9-81b2-fe006afb57af'
	},
	{
		title: 'Paradise',
		author: 'Coldplay',
		source: 'Librivox',
		uri:'https://firebasestorage.googleapis.com/v0/b/music-royale-a3aaa.appspot.com/o/songs%2FColdplay%20-%20Paradise%20(Official%20Video).mp3?alt=media&token=0b881a01-6d13-4777-b595-a4db668d5a5c',
		imageSource: 'https://firebasestorage.googleapis.com/v0/b/music-royale-a3aaa.appspot.com/o/Album%20Covers%2FColdplayAlbumCover.jpg?alt=media&token=0612ca53-05ac-4cc9-81b2-fe006afb57af'
	},
	{
		title: 'Viva La Vida',
		author: 'Coldplay',
		source: 'Librivox',
		uri:'https://firebasestorage.googleapis.com/v0/b/music-royale-a3aaa.appspot.com/o/songs%2FColdplay%20-%20Viva%20La%20Vida%20(Official%20Video).mp3?alt=media&token=9ebca02c-8eeb-4c9d-8670-e9901b24722f',
		imageSource: 'https://firebasestorage.googleapis.com/v0/b/music-royale-a3aaa.appspot.com/o/Album%20Covers%2FColdplayAlbumCover.jpg?alt=media&token=0612ca53-05ac-4cc9-81b2-fe006afb57af'
	}	
]

export default class App extends React.Component {
	state = {
		isPlaying: false,
		playbackInstance: null,
		currentIndex: 0,
		volume: 1.0,
		isBuffering: true
	}

	async componentDidMount() {
		try {
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: false,
				interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
				playsInSilentModeIOS: true,
				interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
				shouldDuckAndroid: true,
				staysActiveInBackground: true,
				playThroughEarpieceAndroid: true
			})

			this.loadAudio()
		} catch (e) {
			console.log(e)
		}
	}

	//Loads Audio taken from audioBookPlaylist array
	async loadAudio() {
		const { currentIndex, isPlaying, volume } = this.state

		try {
			const playbackInstance = new Audio.Sound()
			const source = {
				uri: audioBookPlaylist[currentIndex].uri
			}

			const status = {
				shouldPlay: isPlaying,
				volume: volume
			}

			playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
			await playbackInstance.loadAsync(source, status, false)
			this.setState({
				playbackInstance
			})
		} catch (e) {
			console.log(e)
		}
	}

	onPlaybackStatusUpdate = status => {
		this.setState({
			isBuffering: status.isBuffering
		})
	}
//Handles Playing/Pausing Music
	handlePlayPause = async () => {
		const { isPlaying, playbackInstance } = this.state
		isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()

		this.setState({
			isPlaying: !isPlaying
		})
	}

	//Handles Index in Array for Previous Track
	handlePreviousTrack = async () => {
		let { playbackInstance, currentIndex } = this.state
		if (playbackInstance) {
			await playbackInstance.unloadAsync()
			currentIndex < audioBookPlaylist.length - 1 ? (currentIndex -= 1) : (currentIndex = 0)
			this.setState({
				currentIndex
			})
			this.loadAudio()
		}
	}

	//Handles Index in Array for Next Track
	handleNextTrack = async () => {
		let { playbackInstance, currentIndex } = this.state
		if (playbackInstance) {
			await playbackInstance.unloadAsync()
			currentIndex < audioBookPlaylist.length - 1 ? (currentIndex += 1) : (currentIndex = 0)
			this.setState({
				currentIndex
			})
			this.loadAudio()
		}
	}

	//Handles Track Text (Title, Author, Source)
	renderFileInfo() {
		const { playbackInstance, currentIndex } = this.state
		return playbackInstance ? (
			<View style={styles.trackInfo}>
				<Text style={[styles.trackInfoText, styles.largeText]}>
					{audioBookPlaylist[currentIndex].title}
				</Text>
				<Text style={[styles.trackInfoText, styles.smallText]}>
					{audioBookPlaylist[currentIndex].author}
				</Text>
				<Text style={[styles.trackInfoText, styles.smallText]}>
					{audioBookPlaylist[currentIndex].source}
				</Text>
			</View>
		) : null
	}

	//Handles Album Art Displayed and Playback Icons (Next, Pause, Play)
	render() {
		const { playbackInstance, currentIndex } = this.state
		return playbackInstance ? (
			<View style={styles.container}>
				<Image
					style={styles.albumCover}
					source={{ uri: audioBookPlaylist[currentIndex].imageSource}}
				/>
				<View style={styles.controls}>
					<TouchableOpacity style={styles.control} onPress={this.handlePreviousTrack}>
						<Ionicons name='ios-chevron-back' size={48} color='#444' />
					</TouchableOpacity>
					<TouchableOpacity style={styles.control} onPress={this.handlePlayPause}>
						{this.state.isPlaying ? (
							<Ionicons name='ios-pause' size={48} color='#444' />
						) : (
							<Ionicons name='ios-play-circle' size={48} color='#444' />
						)}
					</TouchableOpacity>
					<TouchableOpacity style={styles.control} onPress={this.handleNextTrack}>
						<Ionicons name='ios-chevron-forward' size={48} color='#444' />
					</TouchableOpacity>
				</View>
				{this.renderFileInfo()}
			</View>
		) : null
	}
}

//Handles Formatting of Objects on Page
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	albumCover: {
		width: 250,
		height: 250
	},
	trackInfo: {
		padding: 40,
		backgroundColor: '#fff'
	},

	trackInfoText: {
		textAlign: 'center',
		flexWrap: 'wrap',
		color: '#550088'
	},
	largeText: {
		fontSize: 22
	},
	smallText: {
		fontSize: 16
	},
	control: {
		margin: 20
	},
	controls: {
		flexDirection: 'row'
	}
})
