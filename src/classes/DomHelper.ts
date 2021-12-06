export class DomHelper {
    hasClass(ele, cls): boolean {
        return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }
    
    addClass(ele, cls): void {
        if (!this.hasClass(ele, cls)) ele.className += " " + cls;
    }
    
    removeClass(ele, cls): void {
        if (this.hasClass(ele, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            ele.className = ele.className.replace(reg, ' ');
        }
    }
    setNameInDiv(elm, text): void {
        elm.textContent = text;
    }
}
