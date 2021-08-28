/**
* 作者: 橙汁
* Author: Boranget
* qq: 1813654512
*/
function scheduleHtmlParser(html) {
    // 最终的课程结果集合
    let result = []
    // 寻找单节课最小元素
    let ereryCourse = $('#table1 .timetable_con')
    // 遍历单节课集合
    for (let u = 0; u < ereryCourse.length; u++) {
        // 课程对象初始化
        let re = {
            sections: [],
            weeks: []
        }
        // 获取每一门课中的具体信息块,如课程名称等
        let aaa = $(ereryCourse[u]).find('span')
        // 获取其父元素td的id,id格式为周-节
        let week = $(ereryCourse[u]).parent('td')[0].attribs.id
        if (week) {
            // 切割字符串获取首元素
            re.day = Number(week.split('-')[0])
        }
        // 遍历每门课的具体信息,通过title属性来判断信息内容
        for (let i = 0; i < aaa.length; i++) {
            
            if (aaa[i].attribs.title == '上课地点') {

                for (let j = 0; j < $(aaa[i]).next()[0].children.length; j++) {
                    re.position = $(aaa[i]).next()[0].children[j].data
                }
            }
            if (aaa[i].attribs.title == '节/周') {

                for (let j = 0; j < $(aaa[i]).next()[0].children.length; j++) {

                    let lesson = $(aaa[i]).next()[0].children[j].data
                    // 获取节/周信息
                    for (let a = Number(lesson.split(')')[0].split('(')[1].split('-')[0]); a < Number(lesson.split(')')[0].split('(')[1].split('-')[1].split('节')[0]) + 1; a++) {
                        // 循环设置节数
                        re.sections.push({
                            section: a
                        })
                    }
                    for (let a = Number(lesson.split(')')[1].split('-')[0]); a < Number(lesson.split(')')[1].split('-')[1].split('周')[0]) + 1; a++) {
                        let dsz = lesson.split(')')[1].split('-')[1].split('周')[1].split('(')[1]
                        // 循环设置周数
                        if (dsz) {
                            if (dsz == '单') {
                                if (a % 2 == 1) {
                                    re.weeks.push(a)
                                }
                            }
                            if (dsz == '双') {
                                if (a % 2 == 0) {
                                    re.weeks.push(a)
                                }
                            }
                        }
                        if (!dsz) {
                            re.weeks.push(a)
                        }

                    }
                }
            }

            if (aaa[i].attribs.title == '教师') {

                for (let j = 0; j < $(aaa[i]).next()[0].children.length; j++) {
                    re.teacher = $(aaa[i]).next()[0].children[j].data
                }
            }

            if (aaa[i].attribs.class == 'title') {

                for (let j = 0; j < $(aaa[i]).children()[0].children.length; j++) {
                    re.name = $(aaa[i]).children()[0].children[j].data

                }
            }

        }
        result.push(re)
    }

    // 时间表,先不做使用
    // 21-8-27 加入时间表功能,但由于错峰上课,故具体上课时间需学生自行调整

    let sts = [
    {
        "section": 1,
        "startTime": "08:00",
        "endTime": "08:50"
    }, {
        "section": 2,
        "startTime": "09:00",
        "endTime": "09:50"
    }, {
        "section": 3,
        "startTime": "10:10",
        "endTime": "11:00"
    }, {
        "section": 4,
        "startTime": "11:10",
        "endTime": "12:00"
    }, {
        "section": 5,
        "startTime": "14:30",
        "endTime": "15:20"
    }, {
        "section": 6,
        "startTime": "15:30",
        "endTime": "16:20"
    }, {
        "section": 7,
        "startTime": "16:40",
        "endTime": "17:30"
    }, {
        "section": 8,
        "startTime": "17:40",
        "endTime": "18:30"
    }, {
        "section": 9,
        "startTime": "18:30",
        "endTime": "19:20"
    }, {
        "section": 10,
        "startTime": "19:30",
        "endTime": "20:20"
    }, {
        "section": 11,
        "startTime": "20:30",
        "endTime": "21:20"
    }
    ]

    return {
        courseInfos: result,
        sectionTimes: sts
    }
}
