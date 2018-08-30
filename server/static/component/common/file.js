(function(exports) {
    function Cmpt(dom, url) {
        this.init();
    }
    Cmpt.prototype = {
        init: function() {},
        initUploadCmpt: function(dom, url, option) {
            if (!option) option = {};
            var self = option.self || this;
            if (option.multi == true) {
                $(dom).addClass('multi')
                $(dom).on('click', '.c-btn-add', (e) => {
                    $(dom).find('.c-file-input').trigger('click')
                })
            } else {
                $(dom).on('click', '.c-btn-add', (e) => {
                    $(dom).find('.c-file-input').trigger('click')
                })
            }
            $(dom).addClass('empty')
            $(dom).find('.c-file-input').on('change', (e) => {
                let _option = option;
                let _files = e.currentTarget.files
                let _value = e.currentTarget.value;
                let _url = url
                if (_files.length == 0) return;
                let extension = _value.substring(_value.lastIndexOf('.'), _value.length).slice(1).toLowerCase();
                _files[0].extension = extension;
                if (_option.beforeUpload) {
                    let process = _option.beforeUpload(_files, _url, _option);
                    if (process.files) _files = process.files;
                    if (process.url) _url = process.url;
                    if (process.option) _option = process.option;
                }
                Spinner.spin(CPlugin.screen.mainCtn)
                this.upload(_files, _url, _option).done((result) => {
                    _option.success && _option.success.call(self, result);
                }).fail((result) => {
                    _option.fail && _option.fail.call(self, result);
                }).always(function() {
                    Spinner.stop(CPlugin.screen.mainCtn)
                    e.currentTarget.value = '';
                })
            })
        },
        upload: function(files, url, option) {
            // if ($('.fileupload').val().length) {
            //     var fileName = $('.fileupload').val();
            //     var extension = fileName.substring(fileName.lastIndexOf('.'), fileName.length).toLowerCase();
            //     if (extension == ".jpg" || extension == ".png") {
            //         var data = new FormData();
            //         data.append('fulAvatar', $('#fileToUpload')[0].files[0]);
            //     }
            // }


            option = option || {};
            var arrFile = [];
            var self = this;
            [].slice.call(files).forEach(function(file) {
                if (file.size > option.maxsize) {
                    alert('文件大小超出限制')
                    return false;
                }
                if (option.extension && option.extension.indexOf(file.extension) < 0) {
                    alert('文件类型不符')
                    return false;
                }
                arrFile.push(file);
            }.bind(this));

            // var formData = new FormData();

            // option.attr && Object.keys(option.attr).forEach((key) => {
            //     formData.append(key, option.attr[key]);
            // })

            // arrFile.forEach(function(item) {
            //     formData.append('file', item);
            // }.bind(this));


            if (!(arrFile instanceof Array && arrFile.length > 0)) return $.Deferred().rejectWith(self, ['no accept file']);

            var $promise = $.Deferred();


            WebAPI.get(url).done((result) => {
                const fmData = new FormData();
                const { AccessKeyId, policy, signature, dirPath, fileName, callbackbody, host } = result.data;
                const key = `${dirPath}${fileName}${files[0].name}`;
                fmData.append('OSSAccessKeyId', AccessKeyId);
                fmData.append('policy', policy);
                fmData.append('signature', signature);
                fmData.append('key', key);
                fmData.append('success_action_status', 200);
                fmData.append('callback', callbackbody);

                arrFile.forEach(function(item) {
                    fmData.append('file', item, `${fileName}${item.name}`);
                }.bind(this));

                new Promise(function(resolve, reject) {
                    let client = new XMLHttpRequest();
                    client.open('POST', host, true);
                    client.onreadystatechange = function() {
                        if (this.readyState !== 4) {
                            return;
                        }
                        if (this.status === 200) {
                            resolve(this.responseText);
                        } else {
                            reject(this.status);
                        }
                    };
                    // client.upload.addEventListener("progress", uploadProgress, false);
                    client.send(fmData);
                }).then(
                    function(resData) {
                        var result = resData;
                        try {
                            result = JSON.parse(result)
                        } catch (e) {}
                        $promise.resolveWith(self, [result]);
                    },
                    function(sts) {
                        $promise.rejectWith(self, ['network error']);
                    }
                )


                // let formData = new FormData();
                // if (!result || !result.data) $promise.rejectWith(self, ['network error']);
                // let oss_config = result.data
                // const { AccessKeyId, policy, signature, dirPath, fileName, callbackbody } = oss_config
                // const key = `${dirPath}${fileName}${files[0].name}`
                // formData.append('OSSAccessKeyId', AccessKeyId)
                // formData.append('policy', policy)
                // formData.append('signature', signature)
                // formData.append('key', key)
                // formData.append('success_action_status', 200)
                // formData.append('callback', callbackbody)

                // option.attr && Object.keys(option.attr).forEach((key) => {
                //     formData.append(key, option.attr[key]);
                // })

                // arrFile.forEach(function(item) {
                //     formData.append('file', item);
                // }.bind(this));

                // $.ajax({
                //     url: Setting.host + url,
                //     type: 'POST',
                //     data: formData,
                //     cache: false,
                //     contentType: false, //不可缺参数
                //     processData: false, //不可缺参数
                //     success: function(data) {
                //         var result = data;
                //         try {
                //             result = JSON.parse(data)
                //         } catch (e) {}
                //         $promise.resolveWith(self, [result]);
                //     },
                //     error: function() {
                //         $promise.rejectWith(self, ['network error']);
                //     }
                // });
            }).fail(() => {

            })

            return $promise.promise();
        },
        showFileAfterUpload: function(ctn, files, option) {
            var _this = this;
            var container = $(ctn).find('.c-file-list')[0];
            if (!container) return;
            container.innerHTML = '';
            var type = option.type || 'default'
            if (!(files instanceof Array) || files.length == 0) return;
            files.forEach(function(item) {
                let _type = item.type || type;
                let attr = item.attr;
                let tpl = item.tpl ? item.tpl : _this.getFileTemplate(_type);
                let html = tpl.format(attr);
                container.innerHTML += html;
            })
            if (files.length == 0) {
                $(ctn).addClass('empty')
            } else {
                $(ctn).removeClass('empty')
            }
        },
        getFileTemplate(type) {
            if (type == 'img') {
                return '<span class="c-file-list-item"><img class="c-img-item" src="<%src%>"></span>'
            } else {
                return '<span class="c-file-list-item"><span class="icon"></span><span class="name"><%name%></span></span>'
            }
        },
        getFileIcon(type) {

        }
    }
    exports.file = Cmpt;
}(namespace('cmpt')))