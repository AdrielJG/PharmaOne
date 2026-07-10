import React, { useEffect, useState } from 'react';

const DraggableScrollBar = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const scrollbarHeight = 50; // Fixed height of the scrollbar
    const viewportHeight = window.innerHeight;
    const containerHeight = document.documentElement.scrollHeight;

    useEffect(() => {
        const handleScroll = () => {
            const totalScrollableHeight = containerHeight - viewportHeight;
            const scrollRatio = window.scrollY / totalScrollableHeight;
            const maxScrollPosition = viewportHeight - scrollbarHeight - 10; // 10px gap from the bottom
            setScrollPosition(Math.min(scrollRatio * maxScrollPosition, maxScrollPosition));
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [viewportHeight, containerHeight]);

    const startDrag = (e) => {
        setIsDragging(true);
        document.body.classList.add('no-select');
    };

    const stopDrag = () => {
        setIsDragging(false);
        document.body.classList.remove('no-select');
    };

    const handleDrag = (e) => {
        if (isDragging) {
            const maxScrollPosition = viewportHeight - scrollbarHeight - 10;
            const newScrollRatio = Math.min(e.clientY / viewportHeight, 1);
            const newScrollY = newScrollRatio * (containerHeight - viewportHeight);
            window.scrollTo({ top: newScrollY });
            setScrollPosition(newScrollRatio * maxScrollPosition);
        }
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleDrag);
        window.addEventListener("mouseup", stopDrag);
        return () => {
            window.removeEventListener("mousemove", handleDrag);
            window.removeEventListener("mouseup", stopDrag);
        };
    }, [isDragging]);

    return (
        <div
            style={{
                position: 'fixed',
                right: '10px',
                top: `${50 + scrollPosition}px`,
                width: isHovered ? '16px' : '8px', // Wider on hover
                height: `${scrollbarHeight}px`,
                backgroundColor: isHovered ? '#ddd' : '#fff', // White by default, light gray on hover
                cursor: 'pointer',
                borderRadius: '4px',
                zIndex: 1000,
                transition: 'width 0.3s ease, top 0.1s ease',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onMouseDown={startDrag}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ width: '50%', height: '2px', backgroundColor: '#666' }}></div>
                    <div style={{ width: '50%', height: '2px', backgroundColor: '#666' }}></div>
                    <div style={{ width: '50%', height: '2px', backgroundColor: '#666' }}></div>
                </div>
            )}
        </div>
    );
};

export default DraggableScrollBar;
