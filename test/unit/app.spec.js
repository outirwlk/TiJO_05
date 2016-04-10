describe('app', function () {
    'use strict';

    var app = window.app;

    describe('generateMessage', function () {
        var message = app.generateMessage("ala");
        if('should return number od volwels and word is palindrome', function(){
                expect(message.vowel).toEqual(1);
                expect(message.palindrome).toEqual(true);
            });
        var message2 = app.generateMessage("malarz");
        it('should return number of vowels and word is not palindrome', function () {
            expect(message2.vowel).toEqual(3);
            expect(message2.palindrome).toEqual(false);
        });
        it('should return number of vowels and word is palindrome', function () {
            expect(app.generateMessage("lol")).toEqual({vowel: 1, palindrome: true});
        });
        it('should throw exception', function () {
            expect(function () {
                app.generateMessage("");
            }).toThrow(new Error('Empty string!'));
        });
    });

    describe('isPalindrome', function () {

        describe('toHaveBeenCalled', function () {
            beforeAll(function () {
                spyOn(app, 'isPalindrome');
                app.isPalindrome("kajak");
            });
            it('should call isPalindrome function', function () {
                expect(app.isPalindrome).toHaveBeenCalled();
                expect(app.isPalindrome).toHaveBeenCalledWith("kajak");
            });
        });

        describe('and.callThrough', function () {
            beforeAll(function () {
                spyOn(app, 'isPalindrome').and.callThrough();
                app.generateMessage("kajak");
            });
            it('should call isPalindrome function when generateMessage is call', function () {
                expect(app.isPalindrome).toHaveBeenCalled();
                expect(app.isPalindrome).toHaveBeenCalledWith("kajak");
            });
        });

        describe('and.returnValue', function () {
            var palindrome;
            beforeAll(function () {
                spyOn(app, 'isPalindrome').and.returnValue(true);
            });
            it('should call isPalindrome and return true', function () {
                palindrome = app.isPalindrome("ala");
                expect(palindrome).toBe(true);
            });
            it('should call generateMessage and isPalindrome should return true', function () {
                palindrome = app.generateMessage("ale");
                expect(palindrome).toEqual({vowel: 2, palindrome: true});
            });
        });

        describe('and.callFake', function () {
            var pal;
            beforeAll(function () {
                spyOn(app, 'isPalindrome').and.callFake(function (str) {
                    var strTemp = str.toLowerCase(),
                        strLength = strTemp.length;
                    if (str === '') {
                        return true;
                    }
                    var halfLength = (strLength % 2 === 0) ? (strLength / 2) : ((strLength - 1) / 2);
                    for (var i = 0; i < halfLength; i++) {
                        if (strTemp[i] !== strTemp.slice(-1 - i)[0]) {
                            return true;
                        }
                    }
                    return false;
                });
            });
            it('should call isPalindrome fake function', function () {
                pal = app.isPalindrome("mam");
                expect(pal).toBe(false);
            });
            it('should call generateMessage and isPalindrome fake function', function () {
                pal = app.generateMessage("mam");
                expect(pal).toEqual({vowel: 1, palindrome: false});
            });
        });

        describe('calls.count()', function () {
            var pal;
            beforeAll(function () {
                spyOn(app, 'isPalindrome').and.callThrough();
            });
            it('should notice that call isPalindrome is call', function () {
                pal = app.isPalindrome("kajak");
                expect(app.isPalindrome.calls.count()).toBe(1);
            });
            it('should notice that isPalindrome is call when generateMessage is call', function () {
                pal = app.generateMessage("kajak");
                expect(app.isPalindrome.calls.count()).toEqual(2);
            });
        });
    });

    describe('vowelCount', function () {

        describe('toHaveBeenCalled', function () {
            beforeAll(function () {
                spyOn(app, 'vowelCount');
                app.vowelCount("abc");
            });
            it('should call vowelCount function', function () {
                expect(app.vowelCount).toHaveBeenCalled();
                expect(app.vowelCount).toHaveBeenCalledWith("abc");
            });
        });

        describe('and.callThrough', function () {
            beforeAll(function () {
                spyOn(app, 'vowelCount').and.callThrough();
                app.generateMessage("abc");
            });
            it('should call vowelCount function when generateMessage is call', function () {
                expect(app.vowelCount).toHaveBeenCalled();
                expect(app.vowelCount).toHaveBeenCalledWith("abc");
            });
        });

        describe('and.returnValue', function () {
            var vow;
            beforeAll(function () {
                spyOn(app, 'vowelCount').and.returnValue(3);
            });
            it('should call vowelCount and return 3', function () {
                vow = app.vowelCount("abc");
                expect(vow).toBe(3);
            });
            it('should call generateMessage and vowelCount should return 3', function () {
                vow = app.generateMessage("abc");
                expect(vow).toEqual({vowel: 3, palindrome: false});
            });
        });

        describe('and.callFake', function () {
            var vow;
            beforeAll(function () {
                spyOn(app,'vowelCount').and.callFake(function (str) {
                    var vowelList = 'aeiouyAEIOUY',
                        vovCount = 0;
                    for (var i = 0, strLength = str.length; i < strLength; i++) {
                        if (vowelList.indexOf(str[i]) !== -1) {
                            vovCount=vovCount+2;
                        }
                    }
                    return vovCount;
                });
            });
            it('should call vowelCount fake function',function () {
                vow=app.vowelCount("abc");
                expect(vow).toBe(2);
            });
            it('should call generateMessage and vowelCount fake function',function () {
                vow=app.generateMessage("abc");
                expect(vow).toEqual({vowel: 2,palindrome: false});
            });
        });

        describe('calls.count()', function () {
            var vow;
            beforeAll(function () {
                spyOn(app,'vowelCount').and.callThrough();
            });
            it('should notice that call vowelCount is call',function () {
                vow=app.vowelCount("abc");
                expect(app.vowelCount.calls.count()).toBe(1);
            });
            it('should notice that vowelCount is call when generateMessage is call',function () {
                vow=app.generateMessage("abc");
                expect(app.vowelCount.calls.count()).toEqual(2);
            });
        });
    });
});
