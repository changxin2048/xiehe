// 清除搜索框内容
const clearIcon = document.querySelector('.clear-icon');
const searchInput = document.querySelector('.search-container input');

if (clearIcon && searchInput) {
    // 监听输入事件，控制清除图标显示
    searchInput.addEventListener('input', () => {
        clearIcon.classList.toggle('visible', searchInput.value.trim() !== '');
    });

    // 监听清除图标点击事件
    clearIcon.addEventListener('click', () => {
        searchInput.value = '';
        clearIcon.classList.remove('visible');
        document.querySelector('.search-form').submit();
    });
}