<h1 style="margin: 40px 0px 10px;">News</h1>

<div class="news-scroll">
{% for item in site.data.news.items %}
{% unless item.hidden %}
<div style="margin-bottom: 6px;"><strong>[{{ item.date }}]</strong> {{ item.content }}</div>
{% endunless %}
{% endfor %}
</div>

<h1 style="margin: 40px 0px 10px;">Blogs</h1>

<div class="hc-carousel" id="blogs-carousel">
  <button class="hc-nav hc-prev" aria-label="Previous blog">&#8249;</button>
  <div class="hc-track-container">
    <div class="hc-track">
      {% assign sorted_blogs = site.blogs | sort: 'date' | reverse %}
      {% for post in sorted_blogs %}
      <div class="hc-slide">
        <a href="{{ post.url }}" class="hc-card hc-card-link">
          <div class="hc-date">{{ post.date | date: "%b %d, %Y" }}</div>
          <div class="hc-title">{{ post.title }}</div>
          {% if post.summary %}
          <div class="hc-summary">{{ post.summary | strip_html | truncatewords: 18 }}</div>
          {% elsif post.excerpt %}
          <div class="hc-summary">{{ post.excerpt | strip_html | truncatewords: 18 }}</div>
          {% endif %}
        </a>
      </div>
      {% endfor %}
    </div>
  </div>
  <button class="hc-nav hc-next" aria-label="Next blog">&#8250;</button>
</div>

<style>
.news-scroll {
  max-height: min(360px, 55vh);
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y;
  padding-right: 8px;
  margin-bottom: 6px;
}

.news-scroll::-webkit-scrollbar {
  width: 6px;
}

.news-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.news-scroll::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.news-scroll::-webkit-scrollbar-thumb:hover {
  background: #999;
}

.hc-carousel {
  position: relative;
  margin: 0 -10px;
}

.hc-track-container {
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x pan-y;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.hc-track-container::-webkit-scrollbar {
  display: none;
}

.hc-track {
  display: flex;
  gap: 16px;
  padding: 4px 10px;
}

.hc-slide {
  flex: 0 0 280px;
  max-width: 80vw;
  min-width: 240px;
}

.hc-card {
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
  border-left: 3px solid #13294B;
  border-radius: 0 8px 8px 0;
  padding: 14px 16px;
  height: 100%;
  min-height: 140px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-decoration: none;
  color: inherit;
}

.hc-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.hc-card-link:hover .hc-title {
  color: #13294B;
}

.hc-date {
  font-weight: 600;
  color: #13294B;
  margin-bottom: 8px;
  font-size: 0.9em;
  flex-shrink: 0;
}

.hc-title {
  font-weight: 600;
  color: #222;
  font-size: 1.05em;
  line-height: 1.35;
  margin-bottom: 8px;
  transition: color 0.2s ease;
}

.hc-summary {
  color: #555;
  font-size: 0.95em;
  line-height: 1.5;
  flex-grow: 1;
}

.hc-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #13294B;
  color: #fff;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.85;
  transition: opacity 0.2s ease, background-color 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.hc-nav:hover {
  opacity: 1;
  background-color: #1a3a6e;
}

.hc-nav:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.hc-prev { left: -6px; }
.hc-next { right: -6px; }

@media (min-width: 768px) {
  .hc-slide {
    flex: 0 0 320px;
    max-width: 45vw;
  }
}

@media (max-width: 480px) {
  .hc-carousel {
    margin: 0 -5px;
  }
  .hc-track {
    gap: 12px;
    padding: 4px 5px;
  }
  .hc-slide {
    flex: 0 0 260px;
    max-width: 82vw;
    min-width: 220px;
  }
  .hc-card {
    padding: 12px 14px;
    min-height: 120px;
  }
  .hc-nav {
    width: 28px;
    height: 28px;
    font-size: 16px;
  }
  .hc-prev { left: -4px; }
  .hc-next { right: -4px; }
}
</style>
