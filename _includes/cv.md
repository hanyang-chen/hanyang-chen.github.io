<h2 style="margin: 60px 0px 10px;">Curriculum Vitae</h2>

<p>You can also download my <a href="{{ site.cv_link }}">CV in PDF</a>.</p>

<div class="cv-section">
  <div class="cv-section-title">Education</div>
  <ul class="cv-list">
  {% for edu in site.data.cv.education %}
    <li class="cv-item">
      <div class="cv-item-left">
        <div class="cv-item-title">{{ edu.degree }}</div>
        <div class="cv-item-meta">{{ edu.school }}, {{ edu.location }}</div>
        {% if edu.advisor %}<div class="cv-item-sub">Advisor: {{ edu.advisor }}</div>{% endif %}
      </div>
      <div class="cv-item-right">{{ edu.time }}</div>
    </li>
  {% endfor %}
  </ul>
</div>

<div class="cv-section">
  <div class="cv-section-title">Awards and Scholarships</div>
  <ul class="cv-list">
  {% for award in site.data.cv.awards %}
    <li class="cv-item">
      <div class="cv-item-left">
        <div class="cv-item-title">{{ award.name }}</div>
        {% if award.org %}<div class="cv-item-meta">{{ award.org }}</div>{% endif %}
      </div>
      <div class="cv-item-right">{{ award.year }}</div>
    </li>
  {% endfor %}
  </ul>
</div>

<div class="cv-section">
  <div class="cv-section-title">Patents</div>
  <ul class="cv-list">
  {% for patent in site.data.cv.patents %}
    <li class="cv-item">
      <div class="cv-item-left">
        <div class="cv-item-title">{{ patent.title }}</div>
        <div class="cv-item-sub">{{ patent.inventors }}</div>
      </div>
      <div class="cv-item-right">{{ patent.number }}</div>
    </li>
  {% endfor %}
  </ul>
</div>

<div class="cv-section">
  <div class="cv-section-title">Competitions</div>
  <ul class="cv-list">
  {% for comp in site.data.cv.competitions %}
    <li class="cv-item">
      <div class="cv-item-left">
        <div class="cv-item-title">{{ comp.name }}</div>
        <div class="cv-item-meta">{{ comp.award }}</div>
      </div>
      <div class="cv-item-right">{{ comp.time }}</div>
    </li>
  {% endfor %}
  </ul>
</div>
<!-- 
<div class="cv-section">
  <div class="cv-section-title">Skills</div>
  {% for skill in site.data.cv.skills %}
  <div class="cv-skills-grid">
    <div class="cv-skill-label">{{ skill.category }}</div>
    <div class="cv-skill-value">{{ skill.items }}</div>
  </div>
  {% endfor %}
</div> -->
