function getTimestamp() {
  return parseInt(new Date() / 1000, 10);
}
function setReadState() {
  localStorage.setItem('leader.url', location.href);
  localStorage.setItem('leader.top', document.documentElement.scrollTop || document.body.scrollTop);
  setTimeout(setReadState, 5000);
}
function getReadState() {
  if (window.localStorage) {
    if (document.referrer === '') {
      var url = localStorage.getItem('leader.url');
      if (url && location.href != url) {
        location.href = url;
        setTimeout(window.scrollTo(0, ~~localStorage.getItem('leader.top')), 300);
      }
      setTimeout(setReadState, 5000);
    }
  }
}

// Docsify配置
window.$docsify = {
  name: '《简约而不简单》',
  repo: 'https://github.com/willin/less.js.cool.git',
  loadSidebar: true,
  subMaxLevel: 2,
  formatUpdated: '{YYYY}-{MM}-{DD} {HH}:{mm}',
  executeScript: true,
  auto2top: true,
  alias: {
   
  },
  search: {
    placeholder: '搜索',
    noData: '未找到结果'
  },
  plugins: [
    function (hook, vm) {
      hook.init(function () {
        getReadState();
        if (typeof mermaid !== 'undefined') { mermaid.initialize({ startOnLoad: false }); }
        var adScript = document.createElement('script');
        adScript.src = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
        adScript.setAttribute('async', true);
        document.body.appendChild(adScript);
      });
      hook.beforeEach(function (md) {
        var url = 'https://github.com/willin/less.js.cool/blob/master' + vm.route.file
        var editUrl = '[:memo: 编辑本章节](' + url + ')\n'
        return md
          + '\n----\n'
          + '最后更新 {docsify-updated} '
          + editUrl
      });
      hook.doneEach(function () {
        if (typeof mermaid !== 'undefined') { mermaid.init(undefined, '.mermaid') };
        var main = document.getElementById('main');
        var paragraphs = main.getElementsByTagName('p');
        var ads = [];
        if (paragraphs.length > 15) {
          ads.push(paragraphs[Math.ceil(Math.random() * 15)]);
        }
        ads.push(paragraphs[paragraphs.length - 1]);
        for (var i = 0; i < ads.length; i += 1) {
          ads[i].insertAdjacentHTML('afterend', '<ins class="adsbygoogle" style="display:block;margin: 1.5em auto;" data-ad-client="ca-pub-5059418763237956" data-ad-slot="9518721243" data-ad-format="auto"></ins>');
          (adsbygoogle = window.adsbygoogle || []).push({});
        }
      });
    }
  ],
  markdown: {
    renderer: {
      code: function (code, lang) {
        var html = '';
        if (code.match(/^sequenceDiagram/) || code.match(/^graph/) || code.match(/^gantt/)) {
          html = '<div class="mermaid">' + code + '</div>';
        }
        var hl = Prism.highlight(code, Prism.languages[lang] || Prism.languages.markup)
        return html + '<pre v-pre data-lang="' + lang + '"><code class="lang-' + lang + '">' + hl + '</code></pre>'
      }
    }
  }
};
// 离线浏览
if (typeof navigator.serviceWorker !== 'undefined') {
  navigator.serviceWorker.register('sw.js');
}
