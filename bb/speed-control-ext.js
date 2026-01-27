// Enhanced Video Speed Controller with Floating Icon - Console Script
(function() {
    // Remove existing controller if present
    const existing = document.getElementById('video-speed-controller');
    if (existing) existing.remove();
    const existingIcon = document.getElementById('video-speed-icon');
    if (existingIcon) existingIcon.remove();

    let isOpen = true;

    // Create floating icon (minimized state)
    const floatingIcon = document.createElement('div');
    floatingIcon.id = 'video-speed-icon';
    floatingIcon.innerHTML = '⚡';
    floatingIcon.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 50%;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        cursor: move;
        z-index: 999998;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        transition: all 0.3s;
        user-select: none;
    `;

    floatingIcon.onmouseover = () => {
        floatingIcon.style.transform = 'scale(1.1)';
        floatingIcon.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.5)';
    };

    floatingIcon.onmouseout = () => {
        floatingIcon.style.transform = 'scale(1)';
        floatingIcon.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4)';
    };

    floatingIcon.onclick = (e) => {
        if (!isDraggingIcon) {
            openPanel();
        }
    };

    // Create main container
    const container = document.createElement('div');
    container.id = 'video-speed-controller';
    container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.95);
        padding: 15px;
        border-radius: 12px;
        z-index: 999999;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
        font-family: Arial, sans-serif;
        min-width: 320px;
        border: 2px solid #667eea;
    `;

    // Title bar with minimize button
    const titleBar = document.createElement('div');
    titleBar.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        cursor: move;
    `;

    const title = document.createElement('div');
    title.textContent = '⚡ Video Speed Control';
    title.style.cssText = `
        color: white;
        font-size: 14px;
        font-weight: bold;
        flex: 1;
    `;

    const minimizeBtn = document.createElement('button');
    minimizeBtn.textContent = '−';
    minimizeBtn.title = 'Minimize';
    minimizeBtn.style.cssText = `
        background: #FF9800;
        color: white;
        border: none;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        margin-left: 5px;
        line-height: 1;
    `;
    minimizeBtn.onclick = (e) => {
        e.stopPropagation();
        minimizePanel();
    };

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.title = 'Close';
    closeBtn.style.cssText = `
        background: #f44336;
        color: white;
        border: none;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        margin-left: 5px;
        line-height: 1;
    `;
    closeBtn.onclick = (e) => {
        e.stopPropagation();
        container.remove();
        floatingIcon.remove();
    };

    titleBar.appendChild(title);
    titleBar.appendChild(minimizeBtn);
    titleBar.appendChild(closeBtn);
    container.appendChild(titleBar);

    // Speed display
    const speedDisplay = document.createElement('div');
    speedDisplay.style.cssText = `
        color: #4CAF50;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 10px;
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    `;
    speedDisplay.textContent = '1.00x';
    container.appendChild(speedDisplay);

    // Slider container
    const sliderContainer = document.createElement('div');
    sliderContainer.style.cssText = `
        margin-bottom: 12px;
        padding: 0 5px;
    `;

    // Speed slider
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0.25';
    slider.max = '3.0';
    slider.step = '0.05';
    slider.value = '1.0';
    slider.style.cssText = `
        width: 100%;
        height: 8px;
        border-radius: 5px;
        background: linear-gradient(to right, #667eea 0%, #764ba2 100%);
        outline: none;
        -webkit-appearance: none;
        cursor: pointer;
    `;

    // Slider styling
    const style = document.createElement('style');
    style.textContent = `
        #video-speed-controller input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #4CAF50;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(0,0,0,0.4);
            border: 2px solid white;
        }
        #video-speed-controller input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #4CAF50;
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 2px 6px rgba(0,0,0,0.4);
        }
        #video-speed-icon {
            animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
    `;
    document.head.appendChild(style);

    // Slider labels
    const sliderLabels = document.createElement('div');
    sliderLabels.style.cssText = `
        display: flex;
        justify-content: space-between;
        color: #aaa;
        font-size: 10px;
        margin-top: 5px;
    `;
    sliderLabels.innerHTML = '<span>0.25x</span><span>1.5x</span><span>3.0x</span>';
    sliderContainer.appendChild(slider);
    sliderContainer.appendChild(sliderLabels);
    container.appendChild(sliderContainer);

    // Slider event
    slider.oninput = function() {
        const speed = parseFloat(this.value);
        speedDisplay.textContent = speed.toFixed(2) + 'x';
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.playbackRate = speed;
        });
    };

    // Button container
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 6px;
        margin-bottom: 10px;
    `;

    // Speed options
    const speeds = [1.0, 1.25, 1.5, 1.7, 1.9, 2.0, 2.5, 3.0];

    // Create buttons
    speeds.forEach(speed => {
        const button = document.createElement('button');
        button.textContent = speed + 'x';
        button.style.cssText = `
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 10px 8px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            font-weight: bold;
            transition: all 0.2s;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        `;

        button.onmouseover = () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
        };

        button.onmouseout = () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
        };

        button.onclick = () => {
            const videos = document.querySelectorAll('video');
            videos.forEach(video => {
                video.playbackRate = speed;
            });
            
            // Update slider and display
            slider.value = speed;
            speedDisplay.textContent = speed.toFixed(2) + 'x';
            
            // Visual feedback
            button.style.background = '#4CAF50';
            setTimeout(() => {
                button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }, 300);
        };

        buttonContainer.appendChild(button);
    });

    container.appendChild(buttonContainer);

    // Reset button
    const resetBtn = document.createElement('button');
    resetBtn.textContent = '↺ Reset to 1x';
    resetBtn.style.cssText = `
        background: #FF9800;
        color: white;
        border: none;
        padding: 10px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 12px;
        font-weight: bold;
        width: 100%;
        transition: all 0.2s;
    `;
    resetBtn.onclick = () => {
        slider.value = 1.0;
        speedDisplay.textContent = '1.00x';
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.playbackRate = 1.0;
        });
    };
    container.appendChild(resetBtn);

    // Functions to show/hide panel
    function minimizePanel() {
        container.style.display = 'none';
        floatingIcon.style.display = 'flex';
        isOpen = false;
    }

    function openPanel() {
        container.style.display = 'block';
        floatingIcon.style.display = 'none';
        isOpen = true;
    }

    // Make panel draggable
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;

    titleBar.onmousedown = dragStart;

    function dragStart(e) {
        if (e.target === minimizeBtn || e.target === closeBtn) return;
        initialX = e.clientX - container.offsetLeft;
        initialY = e.clientY - container.offsetTop;
        isDragging = true;
    }

    document.onmousemove = drag;
    document.onmouseup = dragEnd;

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            container.style.left = currentX + 'px';
            container.style.top = currentY + 'px';
            container.style.right = 'auto';
        }
    }

    function dragEnd() {
        isDragging = false;
    }

    // Make floating icon draggable
    let isDraggingIcon = false;
    let iconInitialX;
    let iconInitialY;
    let iconCurrentX;
    let iconCurrentY;

    floatingIcon.onmousedown = iconDragStart;

    function iconDragStart(e) {
        iconInitialX = e.clientX - floatingIcon.offsetLeft;
        iconInitialY = e.clientY - floatingIcon.offsetTop;
        isDraggingIcon = false;
    }

    document.addEventListener('mousemove', iconDrag);
    document.addEventListener('mouseup', iconDragEnd);

    function iconDrag(e) {
        if (e.buttons === 1 && floatingIcon.style.display === 'flex') {
            isDraggingIcon = true;
            e.preventDefault();
            iconCurrentX = e.clientX - iconInitialX;
            iconCurrentY = e.clientY - iconInitialY;
            floatingIcon.style.left = iconCurrentX + 'px';
            floatingIcon.style.top = iconCurrentY + 'px';
            floatingIcon.style.right = 'auto';
            floatingIcon.style.bottom = 'auto';
        }
    }

    function iconDragEnd() {
        setTimeout(() => {
            isDraggingIcon = false;
        }, 100);
    }

    // Add to page
    document.body.appendChild(container);
    document.body.appendChild(floatingIcon);

    console.log('✅ Enhanced Video Speed Controller loaded!');
    console.log('📌 Features:');
    console.log('   - Quick buttons: 1x, 1.25x, 1.5x, 1.7x, 1.9x, 2x, 2.5x, 3x');
    console.log('   - Slider bar for precise control (0.25x - 3.0x)');
    console.log('   - Click minimize (−) to show floating icon');
    console.log('   - Drag panel or icon to move anywhere on screen');
    console.log('   - Click floating icon (⚡) to reopen panel');
})();
