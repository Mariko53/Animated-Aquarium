class Aquarium {
    constructor() {
        this.canvas = document.getElementById('aquarium');
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        this.init();
        
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        // Initialize arrays for our aquarium elements
        this.fishes = [];
        this.bubbles = [];
        this.seaweeds = [];
        
        // Create fishes
        for (let i = 0; i < 10; i++) {
            this.fishes.push(new Fish(this.canvas));
        }
        
        // Create seaweed
        for (let i = 0; i < 8; i++) {
            this.seaweeds.push(new Seaweed(this.canvas, i));
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Create light effect
        this.createLightEffect();
        
        // Update and draw seaweed
        this.seaweeds.forEach(seaweed => {
            seaweed.update();
            seaweed.draw(this.ctx);
        });
        
        // Update and draw fish
        this.fishes.forEach(fish => {
            fish.update();
            fish.draw(this.ctx);
        });
        
        // Create new bubbles randomly
        if (Math.random() < 0.1) {
            this.bubbles.push(new Bubble(this.canvas));
        }
        
        // Update and draw bubbles
        this.bubbles = this.bubbles.filter(bubble => !bubble.isDead);
        this.bubbles.forEach(bubble => {
            bubble.update();
            bubble.draw(this.ctx);
        });
        
        requestAnimationFrame(() => this.animate());
    }

    createLightEffect() {
        const gradient = this.ctx.createRadialGradient(
            this.canvas.width / 2, 0,
            0,
            this.canvas.width / 2, 0,
            this.canvas.height
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

class Fish {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
        this.y = Math.random() * (canvas.height * 0.8);
        this.size = 15 + Math.random() * 25;
        this.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
        this.speed = 1 + Math.random() * 2;
    }

    reset() {
        this.x = -50;
        this.direction = 1;
        if (Math.random() > 0.5) {
            this.x = this.canvas.width + 50;
            this.direction = -1;
        }
    }

    update() {
        this.x += this.speed * this.direction;
        if (this.direction > 0 && this.x > this.canvas.width + 50) this.reset();
        if (this.direction < 0 && this.x < -50) this.reset();
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.direction, 1);
        
        // Body
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size/2, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Tail
        ctx.beginPath();
        ctx.moveTo(-this.size, 0);
        ctx.lineTo(-this.size * 1.5, -this.size/2);
        ctx.lineTo(-this.size * 1.5, this.size/2);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
    }
}

class Bubble {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 20;
        this.size = 2 + Math.random() * 8;
        this.speed = 1 + Math.random() * 2;
        this.wobble = 0;
        this.wobbleSpeed = 0.02 + Math.random() * 0.03;
        this.opacity = 0.5 + Math.random() * 0.5;
        this.isDead = false;
    }

    update() {
        this.y -= this.speed;
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * 0.5;
        
        if (this.y < -20) {
            this.isDead = true;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }
}

class Seaweed {
    constructor(canvas, index) {
        this.canvas = canvas;
        this.x = (canvas.width / 9) * (index + 1);
        this.segments = 10;
        this.points = Array(this.segments).fill().map((_, i) => ({
            x: 0,
            y: (canvas.height / this.segments) * i
        }));
        this.time = Math.random() * 100;
        this.width = 20 + Math.random() * 20;
    }

    update() {
        this.time += 0.02;
        this.points.forEach((point, i) => {
            point.x = Math.sin(this.time + i * 0.3) * 15;
        });
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.canvas.height);
        ctx.strokeStyle = '#0a5';
        ctx.lineWidth = this.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        this.points.forEach(point => {
            ctx.lineTo(point.x, -point.y);
        });
        ctx.stroke();
        
        ctx.restore();
    }
}

// Start the aquarium when the page loads
window.onload = () => new Aquarium();
