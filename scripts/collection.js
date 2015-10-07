var collectionItemTemplate =
    '<div class="collection-album-container column fourth">'
  + '  <a href="album.html"><img src="assets/images/album_covers/03.png"/></a>'
  + '  <div class="collection-album-info caption">'
  + '  	<p>'
  + '  	<a class="album-name" href="album.html">The Colors</a>'
  + '   <br/>'
  + '   <a href="album.html">Pablo Picasso</a>'
  + '   <br/>'
  + '   X songs'
  + '   <br/>'
  + '  </p>'
  + ' </div>'
  + '</div>';

window.onload = function() {
		
		var collectionContainer = document.getElementsByClassName('album-covers')[0];
		collectionContainer.innerHTML = '';
		for (var i = 0; i < 12; i++) {
				collectionContainer.innerHTML += collectionItemTemplate;
		}
}