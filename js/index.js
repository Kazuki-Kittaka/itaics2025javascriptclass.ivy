// ハンバーガーメニュー機能
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = navMenu.querySelectorAll('a');

    // ハンバーガーボタンをクリック
    hamburgerBtn.addEventListener('click', function() {
        hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // ナビゲーションリンクをクリック時にメニューを閉じる
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ウィンドウをリサイズ時にメニューをリセット
    window.addEventListener('resize', function() {
        if (window.innerWidth > 640) {
            hamburgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// ページ切り替え機能
function showPage(pageNumber) {
    const pages = document.querySelectorAll('.page');
    const buttons = document.querySelectorAll('.page-button');

    // ページを切り替える
    pages.forEach((page, index) => {
        if (index === pageNumber - 1) {
            page.classList.add('active');
            page.style.display = 'block';
        } else {
            page.classList.remove('active');
            page.style.display = 'none';
        }
    });

    // ボタンのスタイルを切り替える
    buttons.forEach(button => {
        const btnPage = parseInt(button.getAttribute('data-page'));
        if (btnPage === pageNumber) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    // プロジェクトセクションまでスクロール
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// スムーズスクロール
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// スクロール時のパラレックス効果
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    }
});

// グリッドアイテムの遅延表示アニメーション
document.addEventListener('DOMContentLoaded', function() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.05}s`;
    });
    
    // 初期表示は1ページ目
    showPage(1);
});

        var TxtRotate = function(el, toRotate, period) {
            this.toRotate = toRotate;
            this.el = el;
            this.loopNum = 0;
            this.period = parseInt(period, 10) || 2000;
            this.txt = '';
            this.tick();
            this.isDeleting = false;
          };
          
          TxtRotate.prototype.tick = function() {
            var i = this.loopNum % this.toRotate.length;
            var fullTxt = this.toRotate[i];
          
            if (this.isDeleting) {
              this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
              this.txt = fullTxt.substring(0, this.txt.length + 1);
            }
          
            this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
          
            var that = this;
            var delta = 300 - Math.random() * 100;
          
            if (this.isDeleting) { delta /= 2; }
          
            if (!this.isDeleting && this.txt === fullTxt) {
              delta = this.period;
              this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
              this.isDeleting = false;
              this.loopNum++;
              delta = 500;
            }
          
            setTimeout(function() {
              that.tick();
            }, delta);
          };
          
          window.onload = function() {
            var elements = document.getElementsByClassName('txt-rotate');
            for (var i=0; i<elements.length; i++) {
              var toRotate = elements[i].getAttribute('data-rotate');
              var period = elements[i].getAttribute('data-period');
              if (toRotate) {
                new TxtRotate(elements[i], JSON.parse(toRotate), period);
              }
            }
            // INJECT CSS
            var css = document.createElement("style");
            css.type = "text/css";
            css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
            document.body.appendChild(css);
          };