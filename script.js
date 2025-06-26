// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add navbar background color change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = '#fff';
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.06)';
    }
});

// Add active class to nav links based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add animation for elements when they come into view
document.addEventListener('DOMContentLoaded', function() {
    // Add a CSS class to elements we want to animate
    const animateElements = document.querySelectorAll('.publication-item, .experience-item, .award-item, .service-item, .skill-item, .tag');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        // Add initial hidden state class
        element.classList.add('pre-animation');
        observer.observe(element);
    });
});

// Add year to footer copyright
document.addEventListener('DOMContentLoaded', function() {
    const footerYear = document.querySelector('footer p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = `&copy; ${currentYear} Zixin Wang. All rights reserved.`;
    }
});

// Add mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const navContent = document.querySelector('.nav-content');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
    mobileMenuBtn.setAttribute('aria-label', 'Toggle menu');
    
    // Insert before the nav links
    navContent.insertBefore(mobileMenuBtn, navContent.firstChild);
    
    // Add click event
    mobileMenuBtn.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('show');
        this.classList.toggle('active');
    });
    
    // Close menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            navLinks.classList.remove('show');
            mobileMenuBtn.classList.remove('active');
        });
    });
});

// Dark mode toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }
    
    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateNavbarStyle('dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            updateNavbarStyle('light');
        }
    }
    
    function updateNavbarStyle(theme) {
        const navbar = document.querySelector('.navbar');
        if (theme === 'dark') {
            navbar.style.backgroundColor = 'rgba(26, 32, 44, 0.95)';
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)';
        } else {
            if (window.scrollY > 50) {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.backgroundColor = '#fff';
                navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.06)';
            }
        }
    }
    
    toggleSwitch.addEventListener('change', switchTheme);
    
    // Update navbar style on initial load
    if (currentTheme === 'dark') {
        updateNavbarStyle('dark');
    }
});

// Interactive publication cards
document.addEventListener('DOMContentLoaded', function() {
    // Add publication details and links to each publication item
    const publicationItems = document.querySelectorAll('.publication-item');
    
    // Publication data - you should update these with your actual links
    const publicationData = {
        "Is Less More? Exploring Token Condensation as Training-Free Test-Time Adaptation": {
            paperLink: "https://arxiv.org/abs/2410.14729",
            codeLink: "#",
            abstract: "Contrastive Language-Image Pretraining (CLIP) excels at learning generalizable image representations but often falls short in zero-shot inference on certain downstream datasets. Test-time adaptation (TTA) mitigates this issue by adjusting components like normalization layers or context prompts, yet it typically requires large batch sizes and extensive augmentations, leading to high computational costs. This raises a key question: Can VLMs' performance drop in specific test cases be mitigated through efficient, training-free approaches? To explore the solution, we investigate token condensation (TC) techniques, originally designed to enhance vision transformer efficiency by refining token usage during inference. We observe that informative tokens improve visual-text alignment in VLMs like CLIP on unseen datasets. However, existing TC methods often fail to maintain in-distribution performance when reducing tokens, prompting us to ask: How can we transform TC into an effective ``free-lunch'' adaptation strategy for VLMs? To address this, we propose Token Condensation as Adaptation (TCA), a training-free adaptation method that takes a step beyond standard TC. Rather than passively discarding tokens, TCA condenses token representation by introducing reservoir-based domain anchor tokens for information-preserving token reduction and logits correction. TCA achieves up to a 21.4% performance improvement over the strongest baseline on cross-dataset benchmark and the CIFAR-100-Corrupted dataset while reducing GFLOPs by 12.2% to 48.9%, with minimal hyperparameter dependency on both CLIP and SigLIP series."
        },
        "In Search of Lost Online Test-Time Adaptation: A Survey": {
            paperLink: "https://link.springer.com/article/10.1007/s11263-024-02213-5",
            codeLink: "https://github.com/Jo-wang/OTTA_ViT_survey",
            abstract: "This paper presents a comprehensive survey on online test-time adaptation (OTTA), a paradigm focused on adapting machine learning models to unseen data upon batch arrival. Despite the recent proliferation of OTTA methods, the field is mired in issues such as ambiguous settings, antiquated backbones, and inconsistent hyperparameter tuning, which obscure the real challenges and make reproducibility elusive. For clarity and a rigorous comparison, we classify OTTA techniques into three primary categories and subject them to benchmarks using the potent Vision Transformer (ViT) backbone to discover genuinely effective strategies. Our benchmarks span conventional corrupted datasets such as CIFAR-10$/$100-C and ImageNet-C and real-world shifts embodied in CIFAR-10.1, OfficeHome, and CIFAR-10-Warehouse."
        },
        "DPO: Dual-Perturbation Optimization for Test-Time Adaptation in 3D Object Detection": {
            paperLink: "https://dl.acm.org/doi/10.1145/3664647.3681040",
            codeLink: "https://github.com/Jo-wang/DPO",
            abstract: "LiDAR-based 3D object detection has seen impressive advances in recent times. However, deploying trained 3D detectors in the real world often yields unsatisfactory performance when the distribution of the test data significantly deviates from the training data due to different weather conditions, object sizes, etc. A key factor in this performance degradation is the diminished generalizability of pre-trained models, which creates a sharp loss landscape during training. Such sharpness, when encountered during testing, can precipitate significant performance declines, even with minor data variations. To address the aforementioned challenges, we propose dual-perturbation optimization (DPO) for Test-time Adaptation in 3D Object Detection (TTA-3OD). We minimize the sharpness to cultivate a flat loss landscape to ensure model resiliency to minor data variations, thereby enhancing the generalization of the adaptation process. To fully capture the inherent variability of the test point clouds, we further introduce adversarial perturbation to the input BEV features to better simulate the noisy test environment. As the dual perturbation strategy relies on trustworthy supervision signals, we utilize a reliable Hungarian matcher to filter out pseudo-labels sensitive to perturbations. Additionally, we introduce early Hungarian cutoff to avoid error accumulation from incorrect pseudo-labels by halting the adaptation process. Extensive experiments across three types of transfer tasks demonstrate that the proposed DPO significantly surpasses previous state-of-the-art approaches, specifically on Waymo → KITTI, outperforming the most competitive baseline by 57.72% in AP_3D and reaching 91% of the fully supervised upper bound."
        },
        "Cal-SFDA: Source-Free Domain-Adaptive Semantic Segmentation with Differentiable Expected Calibration Error": {
            paperLink: "https://dl.acm.org/doi/10.1145/3581783.3611808",
            codeLink: "https://github.com/Jo-wang/Cal-SFDA",
            abstract: "The prevalence of domain adaptive semantic segmentation has prompted concerns regarding source domain data leakage, where private information from the source domain could inadvertently be exposed in the target domain. To circumvent the requirement for source data, source-free domain adaptation has emerged as a viable solution that leverages self-training methods to pseudo-label high-confidence regions and adapt the model to the target data. However, the confidence scores obtained are often highly biased due to over-confidence and class-imbalance issues, which render both model selection and optimization problematic. In this paper, we propose a novel calibration-guided source-free domain adaptive semantic segmentation (Cal-SFDA) framework. The core idea is to estimate the expected calibration error (ECE) from the segmentation predictions, serving as a strong indicator of the model's generalization capability to the unlabeled target domain. The estimated ECE scores, in turn, assist the model training and fair selection in both source training and target adaptation stages. During model pre-training on the source domain, we ensure the differentiability of the ECE objective by leveraging the LogSumExp trick and using ECE scores to select the best source checkpoints for adaptation. To enable ECE estimation on the target domain without requiring labels, we train a value net for ECE estimation and apply statistic warm-up on its BatchNorm layers for stability. The estimated ECE scores assist in determining the reliability of prediction and enable class-balanced pseudo-labeling by positively guiding the adaptation progress and inhibiting potential error accumulation. Extensive experiments on two widely-used synthetic-to-real transfer tasks show that the proposed approach surpasses previous state-of-the-art by up to 5.25% of mIoU with fair model selection criteria."
        },
        "Discovering Domain Disentanglement for Generalized Multi-Source Domain Adaptation": {
            paperLink: "https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=9859733",
            codeLink: "https://github.com/Jo-wang/VDD",
            abstract: "A typical multi-source domain adaptation (MSDA) approach aims to transfer knowledge learned from a set of labeled source domains, to an unlabeled target domain. Nevertheless, prior works strictly assume that each source domain shares the identical group of classes with the target domain, which could hardly be guaranteed as the target label space is not observable. In this paper, we consider a more versatile setting of MSDA, namely Generalized Multi-source Domain Adaptation, wherein the source domains are partially overlapped, and the target domain is allowed to contain novel categories that are not presented in any source domains. This new setting is more elusive than any existing domain adaptation protocols due to the coexistence of the domain and category shifts across the source and target domains. To address this issue, we propose a variational domain disentanglement (VDD) framework, which decomposes the domain representations and semantic features for each instance by encouraging dimension-wise independence. To identify the target samples of unknown classes, we leverage online pseudo labeling, which assigns the pseudo-labels to unlabeled target data based on the confidence scores. Quantitative and qualitative experiments conducted on two benchmark datasets demonstrate the validity of the proposed framework."
        }
    };
    
    publicationItems.forEach(item => {
        // Get publication title
        const title = item.querySelector('h4').textContent.trim();
        
        // Create publication details container
        const detailsContainer = document.createElement('div');
        detailsContainer.className = 'publication-details';
        
        // Add abstract
        const abstract = document.createElement('p');
        abstract.className = 'publication-abstract';
        
        // Get the abstract for this publication or use a default
        const publicationInfo = publicationData[title] || {};
        abstract.textContent = publicationInfo.abstract || 'Abstract not available.';
        
        detailsContainer.appendChild(abstract);
        
        // Add links
        const linksContainer = document.createElement('div');
        linksContainer.className = 'publication-links';
        
        // Get links for this publication
        const links = publicationData[title] || { paperLink: "#", codeLink: "#" };
        
        // Paper link
        const paperLink = document.createElement('a');
        paperLink.href = links.paperLink;
        paperLink.innerHTML = '<i class="fas fa-file-pdf"></i> Paper';
        paperLink.target = '_blank';
        linksContainer.appendChild(paperLink);
        
        // Code link
        const codeLink = document.createElement('a');
        codeLink.href = links.codeLink;
        codeLink.innerHTML = '<i class="fas fa-code"></i> Code';
        codeLink.target = '_blank';
        linksContainer.appendChild(codeLink);
        
        detailsContainer.appendChild(linksContainer);
        
        // Append details container to publication item
        item.appendChild(detailsContainer);
        
        // Add click event to toggle details
        item.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    });
    
    // Add staggered animation to skill bars
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach((level, index) => {
        setTimeout(() => {
            level.style.width = level.style.width;
        }, 300 + (index * 100));
    });
});
