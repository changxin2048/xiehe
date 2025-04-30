// 获取DOM元素
const clearIcon = document.querySelector('.clear-icon');
const searchInput = document.querySelector('.search-container input');
const searchForm = document.querySelector('.search-form');
const contentArea = document.querySelector('.content');

if (clearIcon && searchInput && searchForm) {
    // 监听输入事件，控制清除图标显示
    searchInput.addEventListener('input', () => {
        clearIcon.classList.toggle('visible', searchInput.value.trim() !== '');
    });

    // 监听清除图标点击事件
    clearIcon.addEventListener('click', () => {
        searchInput.value = '';
        clearIcon.classList.remove('visible');
        performSearch('');
    });

    // 监听表单提交事件
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        performSearch(searchInput.value);
    });
}

// 执行搜索并更新内容
async function performSearch(query) {
    try {
        const response = await fetch(`/search?q=${encodeURIComponent(query)}`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        updateContent(data);
    } catch (error) {
        console.error('搜索出错:', error);
    }
}

// 更新内容区域
function updateContent(data) {
    if (!contentArea) return;

    if (data.searchQuery && (!data.searchResults || Object.keys(data.searchResults).length === 0)) {
        contentArea.innerHTML = `
            <div class="no-results">
                <p>没有找到匹配 "${data.searchQuery}" 的结果</p>
            </div>
        `;
        return;
    }

    const content = Object.keys(data.studentData)
        .sort((a, b) => a - b)
        .map(grade => `
            <section class="grade-section">
                <h2>${grade}级录取名单（${data.studentData[grade].students.length}人）</h2>
                <div class="student-grid">
                    ${data.studentData[grade].students.map(student => 
                        student === '董袭莹' ?
                        `<a href="/student/dongxiying" style="text-decoration: none; color: inherit;">
                            <div class="student-card">${student}</div>
                        </a>` :
                        `<div class="student-card">${student}</div>`
                    ).join('')}
                </div>
                ${data.studentData[grade].alternates && data.studentData[grade].alternates.length > 0 ?
                    `<div class="alternates">
                        <h3>候补名单</h3>
                        <div class="student-grid alternate-grid">
                            ${data.studentData[grade].alternates.map(student =>
                                `<div class="student-card alternate">${student}</div>`
                            ).join('')}
                        </div>
                    </div>` :
                    ''}
            </section>
        `).join('');

    contentArea.innerHTML = content;
}