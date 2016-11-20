 var onOff = true;
    $('input:submit').on('click', function() {
        $('.list ul').html('')
        var keyword = $('input:text').val();
        //请求豆瓣数据
        $.ajax({
            type: 'get',
            url: 'https://api.douban.com/v2/music/search',
            data: {
                q: keyword
            },

            dataType: "jsonp",
            jsonCallback: '?',
            jsonp: 'callback',
            success: function(data) {
                var mydata = data.musics;
                console.log(mydata);
                //注意要先设置,叠加
                var str = '';
                $.each(mydata, function(index, value) {
                    str += '<li>\
                <dl class="clearfix">\
                    <dt class="images"><img src=' + this.image + ' alt=""></dt>\
                    <dd class="">\
                        <div class="title">曲名:<span>' + this.title + '</span> </div>\
                        <div class="link">\
                            歌手: <span>' + ('author' in this && this.author[0].name ? this.author[0].name : '未知') + '</span>\
                        </div>\
                        <div class="song">\
                            <a href=' + this.alt + ' class="jump">链接</a>\
                            <button type="" ></button>\
                        </div>\
                    </dd>\
                </dl>\
            </li>';
                    // console.log(str)


                });
                // console.log(str)
                // 加载到界面
                $('.list ul').append($(str));
                $('button').click(function() {
                    console.log($('button').length);
                    var self = $(this)
                        // console.log(888)
                    if (onOff) {
                        var key = $(this).parent().siblings('.title').find('span').text();
                        //获取酷我id
                        $.ajax({
                            type: 'get',
                            url: 'http://search.kuwo.cn/r.s',
                            data: {
                                all: key,
                                ft: 'music',
                                encoding: 'utf8',
                                rformat: 'json'
                                    // itemset: 'web_2013'
                            },
                            dataType: 'jsonp',
                            jsonCallback: 'searchMusicResult',
                            success: function(data) {
                                console.log(data)
                                var path = data.abslist[0].WEBMP3Q0_PATH;
                                var id = data.abslist[0].MUSICRID;
                                console.log(id.match(/(\d+)/)[1])
                                    // console.log(id)
                                    $('audio')[0].pause();
                                var url1 = 'http://other.web.ra01.sycdn.kuwo.cn/resource/' + path;
                                 var url2 = 'http://other.web.rb01.sycdn.kuwo.cn/resource/' + path;
                                 var url3 = 'http://other.web.rd01.sycdn.kuwo.cn/resource/' + path;
                                 var url4 = 'http://other.web.re01.sycdn.kuwo.cn/resource/' + path;
                                 var url5 = 'http://other.web.rh01.sycdn.kuwo.cn/resource/' + path;
                                  var url6 = 'http://other.web.rf01.sycdn.kuwo.cn/resource/' + path;
                                  var url7 = 'http://other.web.rc01.sycdn.kuwo.cn/resource/' + path;
                                 var url8 = 'http://other.web.rg01.sycdn.kuwo.cn/resource/' + path;
                                console.log(url1)

                                var i = 0;
                                var url=[url1,url2,url3,url4,url5,url6,url7,url8]
                                var audio = $('#audio')[0]
                                audio.src= url[0];
                                
                                audio.play();
                                audio.ontimeupdate=function(){
                                    if(audio.error){
                                        audio.src = url[(++i)%8];
                                        audio.load();
                                        audio.play();
                                    }
                                       
                                    //console.log(audio.src);
                                }
                                //console.log(audio.src)
                                //console.log(audio.error)
                                self.css('backgroundImage', 'url(images/pause.png)')
                                onOff = false;




                            },
                            error: function(status) {
                                console.log(999)
                            }
                        });



                    } else {
                        self.css('backgroundImage', 'url(images/play.png)')
                        audio.pause();
                        onOff = true;
                    }

                    // console.log(key)
                })
            }
        })

    });