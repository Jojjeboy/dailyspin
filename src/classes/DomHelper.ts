export class DomHelper {
    hasClass(ele: HTMLInputElement, cls: string): boolean {
        return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }
    
    addClass(ele: HTMLInputElement, cls: string): void {
        if (!this.hasClass(ele, cls)) ele.className += " " + cls;
    }
    
    removeClass(ele: HTMLInputElement, cls: string): void {
        if (this.hasClass(ele, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            ele.className = ele.className.replace(reg, ' ');
        }
    }
    setNameInDiv(elm: HTMLInputElement, text: string): void {
        elm.textContent = text;
    }
}
