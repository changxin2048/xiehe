const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 设置视图引擎
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 静态文件
app.use(express.static(path.join(__dirname, 'public')));

// 学生数据
const studentData = {
  '2019': {
    students: ['朱振宸', '杜丰禾', '林垦彤', '刘立洋', '咸晓梦', '鲍欣淼', '张雨薇', '杨芳涵', '董袭莹', '张立佳', '杨盛旻'],
    alternates: []
  },
  '2020': {
    students: ['王婧桥', '林昱熙', '王路易', '谢雪鹤', '王悠', '李若晨', '钟晓莹', '韩佳澍', '刘明娟', '刘蕴欣', '刘柯', '刘玉晓', '李诗琪'],
    alternates: []
  },
  '2021': {
    students: ['陈越', '段文鑫', '李一林', '李哲', '秋昱翀', '施杨琪', '施勇旺', '王贝铭', '王琳', '王添艺', '王新铭', '吴璇', '徐秋郁', '杨锴', '杨雨荻', '要泽昊', '张开鹏', '赵佳鹏', '钟睿琦', '陈新元', '汪明瑶', '汪玥', '王禹菲', '顾翔宇', '王艺清', '陈新元', '汤佳吟', '李东宇', '荆莉莎', '金逸扬', '周春声', '马潇南', '宁垦', '徐钲博'],
    alternates: ['张梦原', '江楠']
  },
  '2022': {
    students: ['丘铱可', '陆凝', '羡翔宇', '徐赫', '谷炫谕', '黄盛骞', '周晓臻', '聂翔宇', '王宇森', '黄静波', '魏宇歌', '刘畅', '莫瑞洁', '李欣然', '应周梦', '徐赫', '陈逸凡', '许悦', '李浛天', '张钰', '孙如茜', '康筱曼', '周迟珩', '董洛初', '窦佳钰', '程佳曦', '卓松丞', '李光钰', '刘渊', '白羽'],
    alternates: ['熊可文', '王宇婷', '张祎扬']
  },
  '2023': {
    students: ['孟昱', '魏铱楠', '王睿', '杨学思', '漆煜', '李帅', '乔滢瑞', '李晓炜', '耿宛莹', '许芸阁', '任思源', '赵樟贻', '母彦琛', '张秋迎', '薛润哲', '陈仕达', '付一凡', '祝家豪', '康惟熙', '杨宇晨', '徐莫扬', '张芷馨', '朱晨嫣雯', '张捷轩', '张默', '王勇胜', '马宇辰', '任冠竹', '樊吴迪', '王丁汉', '彭露怡', '回轶男', '朱婧瑶', '范书娴', '沙子忻', '梁宸', '张晓洲', '吉语', '韩佳乐', '任北辰', '徐瑞辰', '黄琳萱'],
    alternates: []
  },
  '2024': {
    students: ['肖霄', '蔡正浩', '张昕奕', '王纳川', '金怡杉', '毛忠琪', '段骁涵', '李飞宇', '方文昊', '朱嘉悦', '尚得昕', '王涵', '李帅鑫', '卫昱辰', '边书阳', '李少杨', '纪琳佳', '刘雨菲', '冯暖曦', '张昕奕', '梁亦轲', '邱靖涵', '马嘉明', '方文昊', '陈尔真', '姜楠', '葛欣阳', '庞玥茵', '张靖岳', '李心慧', '李宇翔', '王玮奇', '姚翔'],
    alternates: []
  },
  '2025': {
    students: ['闫宸', '张丹', '罗胜聪', '刘丛语', '李雨江', '张博栋', '肖荟尹', '沈跃然', '王铭萱', '姜博茏', '蒋馨欧', '陈佳善', '乔伟', '李航', '罗浥瑄', '吴淳炜', '郑歆瑶', '朱成林', '梁宇腾', '马语嫣', '盛玺澄', '郭睿宁', '李航', '张何睿', '周纪元', '吴佳蕙', '王麓淇', '杨子杆', '李想', '陈琪', '冉涛', '冯笑与', '李瑞恩', '易润杰', '张博栋', '王铭萱', '柴元皓', '彭嘉宁', '张鹤议', '王天皓', '曹喆'],
    alternates: []
  },
  '2026': {
    students: ['白皓宇', '雷丹', '岳云含', '成昊洋', '郑瑜娴', '俞越', '徐泽昊', '郑雨甜', '刘明旭', '张杰宸', '王韵清', '丁启宸', '张洋意', '薛晨熙', '舒子栋', '陈施源', '沈烨', '于瀚淼', '邱婧婷', '李家鑫', '戴嘉乐', '魏思扬', '刘芷灵', '董海一', '赵蕾然', '黄嘉仪', '向艾宁堃', '邵杰', '邵佳怡'],
    alternates: []
  }
};

// 路由
app.get('/', (req, res) => {
  res.render('index', { 
    title: '北京协和医学院4+4临床医学教育项目录取名单',
    grades: Object.keys(studentData),
    studentData: studentData,
    allStudentData: studentData, // Pass complete data for sidebar counts
    searchQuery: '',
    searchResults: null
  });
});

// 搜索路由
app.get('/search', (req, res) => {
  const query = req.query.q || '';
  let results = {};
  
  if (query) {
    Object.keys(studentData).forEach(grade => {
      const matchedStudents = studentData[grade].students.filter(
        student => student.includes(query)
      );
      
      const matchedAlternates = studentData[grade].alternates.filter(
        student => student.includes(query)
      );
      
      if (matchedStudents.length > 0 || matchedAlternates.length > 0) {
        results[grade] = {
          students: matchedStudents,
          alternates: matchedAlternates
        };
      }
    });
  }

  // 如果是AJAX请求，返回JSON格式的搜索结果
  if (req.xhr || req.headers.accept.includes('application/json')) {
    return res.json({
      studentData: query ? results : studentData,
      searchQuery: query,
      searchResults: Object.keys(results).length > 0 ? results : null
    });
  }
  
  // 否则渲染完整页面
  res.render('index', { 
    title: '北京协和医学院4+4临床医学教育项目录取名单',
    grades: Object.keys(studentData),
    studentData: query ? results : studentData,
    allStudentData: studentData, // Pass complete data for sidebar counts
    searchQuery: query,
    searchResults: Object.keys(results).length > 0 ? results : null
  });
});

// 学生详情路由
app.get('/student/dongxiying', (req, res) => {
  // For now, we only have details for 董袭莹
  // In the future, you might fetch student details based on a parameter
  res.render('student-detail'); 
});

// 年级筛选路由
app.get('/grade/:year', (req, res) => {
  const year = req.params.year;
  let filteredData = {};
  
  if (studentData[year]) {
    filteredData[year] = studentData[year];
  }
  
  res.render('index', { 
    title: '北京协和医学院4+4临床医学教育项目录取名单',
    grades: Object.keys(studentData),
    studentData: filteredData, // Filtered data for main content
    allStudentData: studentData, // Complete data for sidebar counts
    searchQuery: '',
    searchResults: null,
    activeGrade: year
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});