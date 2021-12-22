// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
let videoid;
var player;
function create(id) {
    // Delete div if exsists
    if (player) {
        player.getIframe().remove();
    }
    // Create player div
    var div = document.createElement('div');
    div.setAttribute("id", "player");
    document.body.insertBefore(div, document.body.children[1]);
    
    player = new YT.Player('player', {
        height: '600px',
        width: '100%',
        videoId: id,
        playerVars: {
            'playsinline': 1
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

// 4. after the API code downloads call the function
function onYouTubeIframeAPIReady() {
    create("U0TXIXTzJEY")
}