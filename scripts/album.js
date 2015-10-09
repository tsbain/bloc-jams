// Example album

var albumPicasso = {
	name: 'The Colors',
	artist: 'Pablo Picasso',
	label: 'Cubism',
	year: '1881',
	albumArtUrl: 'assets/images/album_covers/02.png',
	songs: [
		{ name: 'Blue', length: '4:26' },
		{ name:	'Green', length: '3:14' },
		{ name:	'Red', length: '5:01' },
		{ name:	'Pink', length: '3:21' },
		{ name:	'Magenta', length: '2:15' }
	]
};

// Second example album

var albumMarconi = {
	name: 'The Telephone',
	artist: 'Guglielmo Marconi',
	label: 'EM',
	year: '1909',
	albumArtUrl: 'assets/images/album_covers/06.png',
	songs: [
		{ name: 'Hello, Operator', length: '1:01' },
		{ name:	'Ring, ring, ring', length: '5:01' },
		{ name:	'Fits in your pocket', length: '3:21' },
		{ name:	'Can you hear me now?', length: '3:14' },
		{ name:	'Wrong phone number', length: '2:15' }
	]
};

// Third example album

var albumJourney = {
	name: 'Greatest Hits',
	artist: 'Journey',
	label: 'Def',
	year: '1985',
	albumArtUrl: 'assets/images/album_covers/11.png',
	songs: [
		{ name: 'Don\'t Stop Believin\'', length: '4:01' },
		{ name:	'Faithfully', length: '2:01' },
		{ name:	'Separate Ways', length: '3:33' },
		{ name:	'I\'ll Be Alright', length: '3:14' },
		{ name:	'Another Song', length: '4:15' }
	]
};

var createSongRow = function (songNumber, songName, songLength) {
	var template = 
		  '<tr class="album-view-song-item">'
		+ ' <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
		+ '	<td class="song-item-title">' + songName + '</td>'
		+ '	<td class="song-item-duration">' + songLength + '</td>'
		+ '</tr>';
	
	return template;	
};

// Select elements we want to populate with text dynamically
var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var setCurrentAlbum = function(album) {
	
	// Assign values to each part of the album (text, images)
	albumTitle.firstChild.nodeValue = album.name;
	albumArtist.firstChild.nodeValue = album.artist;
	albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
	albumImage.setAttribute('src', album.albumArtUrl);
	
	// Clear contents of album song list container
	albumSongList.innerHTML = '';
	
	// Build list of songs from album JavaScript object
	for (var i = 0; i < album.songs.length; i++) {
		albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
	}
};

// Change song number to the pause button #1
var findParentByClassName = function(element, targetClass) {
	var currentParent = element.parentElement;
	while (currentParent.className != targetClass) {
		currentParent = currentParent.parentElement;
	}
	return currentParent;
};

// Change song number to the pause button #2
var getSongItem = function(element) {
	switch (element.className) {
		case 'album-song-button':
		case 'ion-play':
		case 'ion-pause':
			return findParentByClassName(element, 'song-item-number');
		case 'album-view-song-item':
			return element.querySelector('.song-item-number');
		case 'song-item-title':
		case 'song-item-duration':
			return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
		case 'song-item-number':
			return element;
		default:
			return;
		}
};
																						
var clickHandler = function(targetElement) {

	var songItem = getSongItem(targetElement);

	if (currentlyPlayingSong === null) {
		songItem.innerHTML = pauseButtonTemplate;
		currentlyPlayingSong = songItem.getAttribute('data-song-number');
	} else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
		songItem.innerHTML = playButtonTemplate;
		currentlyPlayingSong = null;
	} else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
		var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentPlayingSong + '"]');
		currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
		songItem.innerHTML = pauseButtonTemplate;
		currentlyPlayingSong = songItem.getAttribute('data-song-number');
	}

};
																						
// Elements we'll be adding listeners to
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');


// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
			
// Store state of playing songs
var currentlyPlayingSong= null;

window.onload = function() {
	
	setCurrentAlbum(albumPicasso);
		
	songListContainer.addEventListener('mouseover', function(event) {
		//Only target individual song rows during event delegation
		if (event.target.parentElement.className === 'album-view-song-item') {
			event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
			var songItem = getSongItem(event.target);
			
			if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
				songItem.innerHTML = playButtonTemplate;
			}
		}
	});
	
	for (i = 0; i < songRows.length; i++) {
		songRows[i].addEventListener('mouseleave', function(event) {
			var songItem = getSongItem(event.target);
			var songItemNumber = songItem.getAttribute('data-song-number');
			
			if (songItemNumber !== currentlyPlayingSong) {
				songItem.innerHTML = songItemNumber;
			}
		});
		
		songRows[i].addEventListener('click', function(event) {
			// Event handler call
			clickHandler(event.target);
		});
	}
	
	var albums = [albumPicasso, albumMarconi, albumJourney];
	var index = 1;
		
	// Add event handler which will toggle albums upon user click		
	albumImage.addEventListener('click', function(event) {
		setCurrentAlbum(albums[index]);
		index++;
		if (index == albums.length) {
			index = 0;
		}
	});	
};