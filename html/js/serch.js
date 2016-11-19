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
                                console.log(url1)



                                $('#audio1').attr("src", url1);
                                $('#audio2').attr("src", url2);
                                $('#audio3').attr("src", url3);
                                $('#audio4').attr("src", url4);
                                $('#audio5').attr("src", url5);
                                $('#audio6').attr("src", url6);
                                $('#audio7').attr("src", url7);
                                $('#audio1')[0].play();
                                $('#audio2')[0].play();
                                $('#audio3')[0].play();
                                $('#audio4')[0].play();
                                $('#audio5')[0].play();
                                $('#audio6')[0].play();
                                $('#audio7')[0].play();

                                self.css('backgroundImage', 'url(pause.png)')
                                onOff = false;




                            },
                            error: function(status) {
                                console.log(999)
                            }
                        });



                    } else {
                        self.css('backgroundImage', 'url(play.png)')
                        $('#audio1')[0].pause();
                        $('#audio2')[0].pause();
                        $('#audio3')[0].pause();
                        $('#audio4')[0].pause();
                        $('#audio5')[0].pause();
                        $('#audio6')[0].pause();
                        $('#audio7')[0].pause();
                        onOff = true;
                    }

                    // console.log(key)
                })
            }
        })

    });