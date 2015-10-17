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
		+ '</tr>'
        ;
	
	var $row = $(template);
    
    var clickHandler = function() {
        var songNumber = $(this).attr('data-song-number');
        
        if (currentlyPlayingSong !== null) {
            //Revert to song number for currently playing song because user started playing new song.
            var currentlyPlayingCell = $('song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
            currentlyPlayingCell.html(currentlyPlayingSong);
        }
        if currentlyPlayingSong !== songNumber) {
            // Switch from Play -> Pause button to indicate new song is playing
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSong = songNumber;
        } else if (currentlyPlayingSong === songNumber) {
            // Switch from Pause -> Play button to pause currently playing song
            $(this).html(playButtonTemplate);
            currentlyPlayingSong = null;
        }
    };
    
    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');
        
        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(playButtonTemplate);
        }
    };
    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');
        
        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(songNumber);
        }        
    };
    
    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
};

var $albumTitle = $('.album-view-title');
var $albumArtist = $('.album-view-artist');
var $albumReleaseInfo = $('.album-view-release-info');
var $albumImage = $('.album-cover-art');
var $albumSongList = $('.album-view-song-list');

var setCurrentAlbum = function(album) {
    
	$albumTitle.text(album.name);
	$albumArtist.text(album.artist);
	$albumReleaseInfo.text(album.year + ' ' + album.label);
	$albumImage.attr('src', album.albumArtUrl);
	
	$albumSongList.empty();
	for (i = 0; i < album.songs.length; i++) {
		var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
        $albumSongList.append($newRow);
	}
};

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
			
// Store state of playing songs
var currentlyPlayingSong = null;

$(document).ready(function() {	
	setCurrentAlbum(albumPicasso);
});
	
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