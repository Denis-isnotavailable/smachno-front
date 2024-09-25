export const getScrollbarSize = () => {
    // get scroll width
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    // outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

    document.body.appendChild(outer);

    const widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = 'scroll';

    // add innerdiv
    const inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    const widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode!.removeChild(outer);

    return widthNoScroll - widthWithScroll;
};

export const hasScrollbar = () => {
    // проверка на боковой скролл
    return document.body.scrollHeight >= document.body.clientHeight;
};

export const removeScroll = () => {
    window.document.body.style.height = '100vh';
    window.document.body.style.overflow = 'hidden';
    
    if (hasScrollbar()) {
        document.body.style.width = `calc(100% - ${getScrollbarSize()}px)`;
    } else {
        document.body.style.width = '100%';
    }
};

export const abortScrollRemovingHeader = () => {
    document.body.style.height = '';
    document.body.style.overflow = 'auto';
    document.body.style.width = '';
};

export const abortScrollRemovingDownOnPage = () => {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
};
