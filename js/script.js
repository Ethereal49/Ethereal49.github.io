// 监听滚动，实现菜单高亮效果
document.addEventListener("DOMContentLoaded", function () {
  // 添加导航菜单
  const header = document.querySelector("header");
  const nav = document.createElement("nav");
  nav.className = "navbar";
  nav.innerHTML = `
        <div class="container">
            <a href="#" class="logo">个人主页</a>
            <ul class="nav-links">
                <li><a href="#about" class="active">关于我</a></li>
                <li><a href="#skills">技能</a></li>
                <li><a href="#portfolio">作品集</a></li>
                <li><a href="#contact">联系我</a></li>
            </ul>
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
  header.insertBefore(nav, header.firstChild);

  // 添加导航样式
  const style = document.createElement("style");
  style.textContent = `
        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background-color: rgba(44, 62, 80, 0.9);
            z-index: 1000;
            padding: 20px 0;
            transition: all 0.3s ease;
        }

        .navbar .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            color: white;
            font-size: 1.5rem;
            font-weight: bold;
        }

        .nav-links {
            display: flex;
            list-style: none;
        }

        .nav-links li {
            margin-left: 30px;
        }

        .nav-links a {
            color: white;
            font-weight: 500;
            position: relative;
            padding-bottom: 5px;
        }

        .nav-links a::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background-color: var(--primary-color);
            transition: all 0.3s ease;
        }

        .nav-links a:hover::after,
        .nav-links a.active::after {
            width: 100%;
        }

        .hamburger {
            display: none;
            cursor: pointer;
        }

        .hamburger span {
            display: block;
            width: 25px;
            height: 3px;
            background-color: white;
            margin: 5px 0;
            transition: all 0.3s ease;
        }

        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                top: 70px;
                left: -100%;
                width: 100%;
                flex-direction: column;
                background-color: rgba(44, 62, 80, 0.95);
                padding: 20px 0;
                transition: all 0.3s ease;
            }

            .nav-links.active {
                left: 0;
            }

            .nav-links li {
                margin: 15px 0;
                text-align: center;
            }

            .hamburger {
                display: block;
            }

            .hamburger.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 6px);
            }

            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }

            .hamburger.active span:nth-child(3) {
                transform: rotate(-45deg) translate(5px, -6px);
            }
        }
    `;
  document.head.appendChild(style);

  // 汉堡菜单点击事件
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // 菜单链接点击事件
  const links = document.querySelectorAll(".nav-links a");

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // 移除所有激活状态
      links.forEach((item) => item.classList.remove("active"));

      // 添加激活状态
      this.classList.add("active");

      // 关闭移动端菜单
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");

      // 平滑滚动到目标位置
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      window.scrollTo({
        top: targetSection.offsetTop - 70,
        behavior: "smooth",
      });
    });
  });

  // 滚动监听，菜单高亮
  window.addEventListener("scroll", function () {
    const scrollPos = window.scrollY;

    // 导航栏背景变化
    if (scrollPos > 100) {
      nav.style.padding = "10px 0";
      nav.style.backgroundColor = "rgba(44, 62, 80, 1)";
    } else {
      nav.style.padding = "20px 0";
      nav.style.backgroundColor = "rgba(44, 62, 80, 0.9)";
    }

    // 菜单项高亮
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      const topDistance = section.offsetTop - 150;
      const bottomDistance = topDistance + section.offsetHeight;

      if (scrollPos >= topDistance && scrollPos < bottomDistance) {
        const currentId = "#" + section.getAttribute("id");

        links.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === currentId) {
            link.classList.add("active");
          }
        });
      }
    });
  });

  // 表单提交事件
  const contactForm = document.querySelector(".contact-form");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // 获取表单数据
    const formData = new FormData(this);
    const formValues = {};

    for (const [key, value] of formData.entries()) {
      formValues[key] = value;
    }

    // 显示提交成功消息
    this.innerHTML =
      '<div class="success-message"><i class="fas fa-check-circle"></i><h3>消息已发送！</h3><p>感谢您的留言，我会尽快回复您。</p></div>';

    // 添加样式
    const successStyle = document.createElement("style");
    successStyle.textContent = `
            .success-message {
                text-align: center;
                padding: 40px 20px;
            }

            .success-message i {
                font-size: 4rem;
                color: var(--success-color);
                margin-bottom: 20px;
            }
        `;
    document.head.appendChild(successStyle);
  });

  // 添加页面加载动画
  const loader = document.createElement("div");
  loader.className = "page-loader";
  loader.innerHTML = '<div class="loader"></div>';
  document.body.appendChild(loader);

  // 加载动画样式
  const loaderStyle = document.createElement("style");
  loaderStyle.textContent = `
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--dark-color);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }

        .loader {
            width: 50px;
            height: 50px;
            border: 5px solid rgba(255, 255, 255, 0.3);
            border-top: 5px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
  document.head.appendChild(loaderStyle);

  // 页面加载完成后隐藏加载动画
  window.addEventListener("load", function () {
    setTimeout(function () {
      loader.style.opacity = "0";
      setTimeout(function () {
        loader.style.display = "none";
      }, 500);
    }, 1000);
  });

  // 添加回到顶部按钮
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.className = "scroll-top-btn";
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(scrollTopBtn);

  // 回到顶部按钮样式
  const scrollBtnStyle = document.createElement("style");
  scrollBtnStyle.textContent = `
        .scroll-top-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.2rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: var(--box-shadow);
        }

        .scroll-top-btn.active {
            opacity: 1;
            visibility: visible;
        }

        .scroll-top-btn:hover {
            background-color: var(--secondary-color);
            transform: translateY(-5px);
        }
    `;
  document.head.appendChild(scrollBtnStyle);

  // 滚动事件监听，显示/隐藏回到顶部按钮
  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add("active");
    } else {
      scrollTopBtn.classList.remove("active");
    }
  });

  // 回到顶部按钮点击事件
  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // 给作品集项添加点击事件
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  portfolioItems.forEach((item) => {
    const detailsBtn = item.querySelector(".btn");

    detailsBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // 创建模态框
      const modal = document.createElement("div");
      modal.className = "portfolio-modal";

      // 获取项目信息
      const title = item.querySelector("h3").textContent;
      const description = item.querySelector("p").textContent;
      const image = item.querySelector("img").src;

      // 设置模态框内容
      modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <div class="modal-header">
                        <h2>${title}</h2>
                    </div>
                    <div class="modal-body">
                        <img src="${image}" alt="${title}">
                        <div class="project-info">
                            <h3>项目描述</h3>
                            <p>${description}</p>
                            <h3>项目细节</h3>
                            <ul>
                                <li><strong>客户:</strong> 示例客户</li>
                                <li><strong>日期:</strong> 2024年</li>
                                <li><strong>角色:</strong> 前端开发</li>
                                <li><strong>技术:</strong> HTML, CSS, JavaScript</li>
                            </ul>
                            <a href="#" class="btn">查看案例</a>
                        </div>
                    </div>
                </div>
            `;

      // 添加模态框样式
      const modalStyle = document.createElement("style");
      modalStyle.textContent = `
                .portfolio-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .modal-content {
                    background-color: white;
                    width: 80%;
                    max-width: 900px;
                    max-height: 90vh;
                    overflow-y: auto;
                    border-radius: var(--border-radius);
                    position: relative;
                    transform: translateY(-50px);
                    transition: transform 0.3s ease;
                }

                .close-modal {
                    position: absolute;
                    top: 15px;
                    right: 20px;
                    font-size: 2rem;
                    color: #aaa;
                    cursor: pointer;
                    transition: color 0.3s ease;
                }

                .close-modal:hover {
                    color: var(--primary-color);
                }

                .modal-header {
                    padding: 20px;
                    border-bottom: 1px solid #eee;
                }

                .modal-body {
                    padding: 20px;
                }

                .modal-body img {
                    width: 100%;
                    height: auto;
                    border-radius: var(--border-radius);
                    margin-bottom: 20px;
                }

                .project-info h3 {
                    margin-top: 30px;
                }

                .project-info ul {
                    list-style: none;
                    margin: 20px 0;
                }

                .project-info li {
                    margin-bottom: 10px;
                }

                @media (max-width: 768px) {
                    .modal-content {
                        width: 95%;
                    }
                }
            `;
      document.head.appendChild(modalStyle);

      // 添加到页面
      document.body.appendChild(modal);

      // 显示模态框
      setTimeout(function () {
        modal.style.opacity = "1";
        modal.querySelector(".modal-content").style.transform = "translateY(0)";
      }, 10);

      // 关闭模态框事件
      const closeBtn = modal.querySelector(".close-modal");

      closeBtn.addEventListener("click", function () {
        modal.style.opacity = "0";
        modal.querySelector(".modal-content").style.transform =
          "translateY(-50px)";

        setTimeout(function () {
          document.body.removeChild(modal);
        }, 300);
      });

      // 点击模态框外部关闭
      modal.addEventListener("click", function (e) {
        if (e.target === modal) {
          closeBtn.click();
        }
      });
    });
  });
});
