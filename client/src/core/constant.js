export default {
    CMPT_CONFIG: {
        NAVBAR: {
            navTop: {
                brand: ``,
                router: {
                    routes: [
                        {
                            text: '首页',
                            action: {
                                href: '/'
                            }
                        },
                        {
                            text: '幻化',
                            action: {
                                href: '/gallery'
                            }
                        },
                        {
                            text: '装修',
                            action: {}
                        },
                        {
                            text: '图册',
                            action: {}
                        },
                        {
                            text: '图鉴',
                            children: [
                                {
                                    text: '套装'
                                },
                                {
                                    text: '散件'
                                }
                            ]
                        },
                        {
                            text: '帮助',
                            children: [
                                {
                                    text: '留言板'
                                },
                                {
                                    text: '投稿指南'
                                },
                                {
                                    text: '联系我们'
                                },
                                {
                                    text: '关于'
                                }
                            ]
                        }
                    ]
                }
            },
            navBottom: {
                router: {
                    cols: [
                        {
                            sections: [
                                {
                                    text: '传送门',
                                    routes: [{ text: '幻化回廊' }, { text: '幻化图鉴' }, { text: '装修图鉴' }, { text: '艾欧泽亚图册' }]
                                }
                            ]
                        },
                        {
                            sections: [
                                {
                                    text: '图鉴检索',
                                    routes: [{ text: '4.0新装备' }, { text: 'PVP装备' }, { text: '制作装备' }, { text: '蛮神装备' }, { text: '24团体副本装备' }]
                                }
                            ]
                        },
                        {
                            sections: [
                                {
                                    text: '用户相关',
                                    routes: [{ text: '个人中心' }, { text: '投稿' }, { text: '收藏柜' }, { text: '搜索历史' }, { text: '关注动态' }]
                                }
                            ]
                        },
                        {
                            sections: [
                                {
                                    text: '友情链接',
                                    routes: [{ text: 'FF14官网' }, { text: 'FF14中文网' }, { text: 'NGA玩家社区' }]
                                },
                                {
                                    text: '下载支持',
                                    routes: [{ text: 'chrome官方正版' }, { text: '网游加速器' }, { text: 'FF14玩家助手' }]
                                }
                            ]
                        }
                    ]
                },
                copyright: 'Copyright (C) 2010 - 2016 SQUARE ENIX CO., LTD. All Rights Reserved. © 2016'
            }
        }
    },
    EQUIPMENT: {
        PART: {
            1: { text: '主武器', pos: 1 },
            2: { text: '副武器', pos: 2 },
            3: { text: '头盔', pos: 1 },
            4: { text: '上装', pos: 1 },
            5: { text: '下装', pos: 1 },
            6: { text: '腰带', pos: 1 },
            7: { text: '手套', pos: 1 },
            8: { text: '鞋子', pos: 1 },
            9: { text: '项链', pos: 2 },
            10: { text: '耳环', pos: 2 },
            11: { text: '手镯', pos: 2 },
            12: { text: '戒指(左)', pos: 2 },
            13: { text: '戒指(右)', pos: 2 }
        }
    },
    SERVER: {
        1: { text: '紫水栈桥' },
        2: { text: '摩杜纳' },
        3: { text: '幻影群岛' },
        4: { text: '拉诺西亚' },
        5: { text: '网通区' }
    },
    CHARACTER: {
        RACE: {
            1: { text: '人类' },
            1: { text: '高地之民' },
            1: { text: '中原之民' },
            2: { text: '猫魅' },
            1: { text: '护月之民' },
            1: { text: '逐日之民' },
            3: { text: '精灵' },
            3: { text: '森林之民' },
            3: { text: '黑影之民' },
            4: { text: '拉拉菲尔' },
            4: { text: '平原之民' },
            4: { text: '沙漠之民' },
            5: { text: '鲁加' },
            5: { text: '北洋之民' },
            5: { text: '红焰之民' },
            6: { text: '奥拉' },
            6: { text: '晨曦之民' },
            6: { text: '暮辉之民' }
        },
        JOB: {
            1: { text: '坦克职业', val: 1 },
            2: { text: '骑士', val: 2, parent: 1 },
            3: { text: '黑骑士', val: 3, parent: 1 },
            4: { text: '战士', val: 4, parent: 1 },
            5: { text: '治疗职业', val: 5 },
            6: { text: '学者', val: 6, parent: 5 },
            7: { text: '白魔法师', val: 7, parent: 5 },
            8: { text: '占星术士', val: 8, parent: 5 },
            9: { text: '近战物理输出', val: 9 },
            10: { text: '龙骑士', val: 10, parent: 9 },
            11: { text: '武僧', val: 11, parent: 9 },
            12: { text: '武士', val: 12, parent: 9 },
            13: { text: '忍者', val: 13, parent: 9 },
            14: { text: '远程物理输出', val: 14 },
            15: { text: '吟游诗人', val: 15, parent: 14 },
            16: { text: '机工士', val: 16, parent: 14 },
            17: { text: '法系输出', val: 17 },
            18: { text: '赤魔法师', val: 18, parent: 17 },
            19: { text: '黑魔法师', val: 19, parent: 17 },
            20: { text: '召唤师', val: 20, parent: 17 },
            21: { text: '大地使者', val: 21 },
            22: { text: '采矿工', val: 22, parent: 21 },
            23: { text: '园艺工', val: 23, parent: 21 },
            24: { text: '捕鱼人', val: 24, parent: 21 },
            25: { text: '能工巧匠', val: 25 },
            26: { text: '刻木匠', val: 26, parent: 25 },
            27: { text: '锻铁匠', val: 27, parent: 25 },
            28: { text: '铸甲匠', val: 28, parent: 25 },
            29: { text: '雕金匠', val: 29, parent: 25 },
            30: { text: '制革匠', val: 30, parent: 25 },
            31: { text: '裁缝匠', val: 31, parent: 25 },
            32: { text: '炼金术士', val: 32, parent: 25 },
            33: { text: '烹饪师', val: 33, parent: 25 }
        },
        GENDER: {
            1: { text: '男性', val: 1 },
            2: { text: '女性', val: 2 }
        }
    },
    USER: {
        ROLE: {
            1: { text: '超级管理员' },
            2: { text: '管理员' },
            3: { text: '编辑' },
            4: { text: '特别用户' },
            5: { text: '普通用户' },
            6: { text: '游客' }
        }
    }
};
