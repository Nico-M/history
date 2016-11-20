$('input:submit').on('click', function () {
    $('.list ul').html('')
    var keyword = $('input:text').val();
    //请求豆瓣数据
    $.ajax({
        type: 'get',
        url: 'https://www.xiami.com/search/json',
        data: {
            k: keyword,
            t: 1
        },

        dataType: "jsonp",
        jsonCallback: '?',
        jsonp: 'callback',
        //success:function(data){
        //    console.log(data)
        //}
        success: function (data) {
            //var mydata = data.musics;
            //console.log(data);
            //注意要先设置,叠加
            var str = '';
            var imgUrl = 'https://img.xiami.net/'
            $.each(data, function (index, value) {
                str += '<li>\
                <dl class="clearfix">\
                    <dt class="images"><img src=' + imgUrl + this.album_logo + ' alt=""></dt>\
                    <dd class="">\
                        <div class="title">曲名:<span>' + this.song_name + '</span> </div>\
                        <div class="link">\
                            歌手: <span>' + this.artist_name + '</span>\
                        </div>\
                        <div class="song">\
                            <a href="#" class="jump">播放</a>\
                            <button type="" id=' + this.song_id + ' ></button>\
                        </div>\
                    </dd>\
                </dl>\
            </li>';
                // console.log(str)


            });
            // console.log(str)
            // 加载到界面
            $('.list ul').append($(str));
            //var onOff = true;
            var audio = $('#audio')[0];

            function startPlay(dom) {
                audio.load();
                audio.play();
                $('.song button').css('backgroundImage', 'url(images/play.png)');
                dom.css('backgroundImage', 'url(images/pause.png)');
                $('.icon li').first().css('backgroundPosition','-492px 0px');
            }

            function stopPlay(dom) {
                audio.pause();
                dom.css('backgroundImage', 'url(images/play.png)')
                $('.icon li').first().css('backgroundPosition','-324px 0px');
            }
            $('.song button').attr('onoff',true);
            $('.song button').click(function () {
                //this.onoff = onOff;
                var song_id = this.id;
                console.log(song_id)
                    //console.log($('button').length);
                var $self = $(this)
                var self = this
                    //    // console.log(888)
                if ($self.attr('onoff') == 'true' ){
                    //var key = $(this).parent().siblings('.title').find('span').text();
                    //获取酷我id
                    $.ajax({
                        type: "get",
                        dataType: "jsonp",
                        jsonp: "callback",
                        url: "https://api.lostg.com/music/" + song_id, //默认接口为虾米单曲
                        data: {
                            lyric: 1
                        },
                        async: !1,
                        jsonCallback: 'searchMusicResult',
                        success: function (data) {

                            $('#warn').text('');
                            //更改播放界面
                            $('.cover').find('img').attr('src', data.album_pic);
                            //<div class="info-name">好久不见</div>
                            //<div class="info-album">《认了吧》</div>
                            //<div class="info-singer">陈奕迅</div>
                            $('.info-name').text(data.title)
                            $(".info-album").text(data.album)
                            $(".info-singer").text(data.singer)
                            var url = data.location;
                            $('.download a').attr('href',url);
                            audio.src = url;
                            startPlay($self);
                            $self.attr('onoff',false);
                            //歌曲时间处理
                            var lyric = data.lyric;
                            var lyric_1 = lyric.split('\n');
                            //console.log(data)
                            //console.log(audio.duration)
                            function formate(t){
                                t = parseInt(t)
                                var min = parseInt(t / 60);
                                    var sec = t % 60;
                                    min = min < 10 ? '0' + min : min;
                                    sec = sec < 10 ? '0' + sec : sec;
                                    var str = min + ':' + sec
                                    return str;
                            }
                            audio.ontimeupdate = function () {
                            $('.count-time i').text(formate(audio.duration))
                                    var str =formate(this.currentTime)
                                    $('.count-time span').text(str);
                                    //console.log(audio.src);
                                    //更改进度条
                                var per = parseInt((this.currentTime/audio.duration)*100)+'%';
                                $('.live-process').css('width',per);
                                }
                                //console.log(audio.src)
                                //console.log(audio.error)
                          

                        },
                        error: function (status) {
                            console.log('获取失败');
                            $('#warn').text('没有资源');
                            setTimeout(function(){
                                $('#warn').text('');
                            },1000)
                        }
                    });



                } else {
                    stopPlay($self);
                   $self.attr('onoff',true);
                }

                // console.log(key)
            })
        }
    })

});
