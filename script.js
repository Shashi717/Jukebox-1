function song(id, src, track_title, album_title, artis_name, track_image_file) {
  this.id = id;
  this.src = src;
  this.track_title = track_title;
  this.album_title = album_title;
  this.artist_name = artis_name;
  this.track_image_file = track_image_file;
}

function Player(playList){
  this.playList = playList;
  this.audio;
  this.i = 0;									// Current track to play
  this.l = playList.length;		// Number of total tracks

  this.load = function(){
    this.audio = new Audio(this.playList[0].src);
    $("#table-body").empty();
    for(var i=0; i<this.playList.length; i++){
      $("#table-body").append(`
        <tr onclick="playerActivate(${i})">
        <td>${playList[i].track_title}</td>
        <td>${playList[i].artist_name}</td>
        <td>${playList[i].album_title}</td>
        </tr>`);
      }
    }

    this.setTrack = function(idx){
      this.i = idx;
      this.audio = new Audio(this.playList[this.i].src);
      if(this.playList[this.i].track_image_file){
        $("#tack-imag").attr("src", this.playList[this.i].track_image_file);
      }else{
        $("#tack-imag").attr("src", "images/disc.png");
      }
      $("#tack").text(this.playList[this.i].track_title);
      $("#artist").text(this.playList[this.i].artist_name);
      $("#album").text(this.playList[this.i].album_title);
    }

    this.play = function(){
      var isPlaying = this.audio.currentTime > 0 &&
      !this.audio.paused && !this.audio.ended;
      if (!isPlaying) {
        this.audio.play();
      }
    }

    this.pause = function(){
      this.audio.pause();
    }

    this.stop = function(){
      this.audio.pause();
      this.audio.currentTime = 0;
    }

    this.next = function(){
      this.audio.pause();
      if (this.i < this.l -1){
        this.i++;
        this.setTrack(this.i);
        this.play();
      }
    }

    this.prev = function(){
      this.audio.pause();
      if (this.i > 0){
        this.i--;
        this.setTrack(this.i);
        this.play();
      }
    }
    
}

function playerActivate(idx){
  player.stop();
  player.setTrack(idx);
  player.play();
};
