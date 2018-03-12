/*
 * creatby linfeng.c
 * date 2017-8-9
 */


//import '../style/index.scss';


class UITool {
  constructor() {
    this.timeout = null;
  }

  toast(options) {
    let _this = this;
    if (!this.timeout) {
      let originOptions = options || {};
      let toastHtml = '';
      let dealyS = originOptions.delay || 2;
      if (typeof originOptions == 'string') {
        toastHtml = `<div class='content'>${originOptions}</div>`;
      } else {
        toastHtml = `<div class='content'><i class="icon icon-${originOptions.type}"></i><span class="text">${originOptions.text}</span></div>`;
      }

      let toastWrap = document.createElement('div');
      toastWrap.className = "ui-tool-toast";
      toastWrap.innerHTML = toastHtml;
      document.body.appendChild(toastWrap);

      return new Promise((resolive, reject) => {
        this.timeout = setTimeout(() => {
          this.removeElement(toastWrap);
          clearTimeout(this.timeout);
          this.timeout = null;
          resolive();
        }, dealyS * 1000);
      });

    }
  }

  confirm(options) {
    // 需要添加底部按钮；
    let _this = this;
    let originOptions = options || {};
    if (typeof originOptions == 'string') {
      originOptions = {
        text: options
      }
    }
    let contentText = originOptions.text || '你确定?';
    let contentBtnLeftText = originOptions.btnLeftText || '取消';
    let contentBtnRightText = originOptions.btnRightText || '确定';
    let confirmHtml = `<div class="confirm">
      <div class="confirm-body">
        ${contentText}
      </div>
      <div class="confirm-footer">
        <div class="btn-left">${contentBtnLeftText}</div>
        <div class="btn-right">${contentBtnRightText}</div>
      </div>
    </div>`;

    let confirmWrap = document.createElement('div');
    confirmWrap.className = 'ui-tool-confirm-layout';
    confirmWrap.innerHTML = confirmHtml;
    document.body.appendChild(confirmWrap);

    return new Promise((resolive, reject) => {
      confirmWrap.addEventListener('click', function (event) {
        if (event.target.getAttribute('class') == 'btn-left') {
          _this.removeElement(confirmWrap);
          resolive('left');
        }
        if (event.target.getAttribute('class') == 'btn-right') {
          _this.removeElement(confirmWrap);
          resolive('right');
        }
      });
    });

  }

  alert(options) {
    let _this = this;
    let originOptions = options || {};
    if (typeof originOptions == 'string') {
      originOptions = {
        text: options
      }
    }
    let contentText = originOptions.text || '你确定?';
    let contentBtnText = originOptions.btnText || '确定';
    let alertHtml = `<div class="alert">
      <div class="alert-body">
        ${contentText}
      </div>
      <div class="alert-footer">
        <div class="alert-btn-text">
          ${contentBtnText}
        </div>
      </div>
    </div>`;
    let alertWrap = document.createElement('div');
    alertWrap.className = 'ui-tool-alert-layout';
    alertWrap.innerHTML = alertHtml;
    document.body.appendChild(alertWrap);
    return new Promise((resolive, reject) => {
      alertWrap.addEventListener('click', function (event) {

    
        if (event.target.getAttribute('class') == 'alert-btn-text') {
          resolive();
          _this.removeElement(alertWrap);
        }
      });
    });
  }

  showLoading(text) {
    if (document.getElementsByClassName('ui-tool-loading').length !== 0) {
      return;
    }
    let contentText = text || '正在加载请稍后...';
    let toastHtml = `<div class='content'><i class="icon icon-loading"></i><span class="text">${contentText}</span></div>`;
    let toastWrap = document.createElement('div');
    toastWrap.className = "ui-tool-loading";
    toastWrap.innerHTML = toastHtml;
    document.body.appendChild(toastWrap);
  }

  hideLoading() {
    let LoadingNode = document.getElementsByClassName('ui-tool-loading')[0];    
    if(!LoadingNode) return;    
    this.removeElement(LoadingNode);
  }

  select(seting = {}) {
    let _this = this;
    let contentTitle = seting.title || '标题';
    let contentFooter = seting.footerText || '取消';
    let contentList = seting.list || [];

    let contentListNode = '';
    contentList.map((item, i) => {
      contentListNode += `<li class="list-group-item" data-id='${item.id}'>${item.text}</li>`;
    });

    let selectHtml = `<div class="select-modal">
      <div class="select-panel">
        <div class="panel-header">
          ${contentTitle}
        </div>
        <div class="panel-body">
          <ul class="list-group">
          ${contentListNode}
          </ul>
        </div>
        <div class="panel-footer">
          ${contentFooter}
        </div>
      </div>
    </div>`;

    let selectWrap = document.createElement('div');
    selectWrap.className = 'ui-tool-select-layout';
    selectWrap.innerHTML = selectHtml;
    document.body.appendChild(selectWrap);
    return new Promise((resolive, reject) => {
      selectWrap.addEventListener('click', function (event) {
        if (event.target.getAttribute('class') == 'panel-footer') {
          reject('cancel');
          _this.removeElement(selectWrap);
        }

        if (event.target.getAttribute('class') == 'list-group-item') {
          let dataId = event.target.getAttribute('data-id');
          if (dataId) {
            resolive({ id: dataId });
            _this.removeElement(selectWrap);
          }
        }

      });
    });
  }

  removeElement(_element) {
    let _parentElement = _element.parentNode;
    if (_parentElement) {
      _parentElement.removeChild(_element);
    }
  }

  //加banner弹窗

};
export default UITool;
