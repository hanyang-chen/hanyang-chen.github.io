---
layout: homepage
---

<h1 id="about-me" style="margin: 40px 0 10px; display: flex; align-items: center; gap: 8px;">
  <span>About Me</span>
  <img id="mario-icon" src="./assets/img/mario.png" alt="It's-a me, Mario!" title="It's-a me! Click me!"
       onclick="toggleMario(this)"
       style="height: 20px; cursor: pointer; transition: transform 0.2s ease;" />
</h1>

<style>
  /* Hover tilt for pointer devices (won't "stick" on touch) */
  @media (hover: hover) {
    #mario-icon:hover {
      transform: translateY(-3px) rotate(-6deg);
    }
  }
  /* Persistent tilt tied to the toggle state — flips on every tap */
  #mario-icon.tilted {
    transform: translateY(-3px) rotate(-6deg);
  }
  #mario-fan {
    max-height: 0;
    overflow: hidden;
    margin-top: -20px;
    transition: max-height 0.4s ease-in-out, margin-top 0.4s ease-in-out;
  }
  #mario-fan.open {
    max-height: 500px;
    margin-top: 0;
  }
</style>
<script type="text/javascript">
  function toggleMario(icon) {
    const isOpen = document.getElementById('mario-fan').classList.toggle('open');
    icon.classList.toggle('tilted', isOpen);
  }
</script>

<!-- <h2 style="margin: 80px 0px 10px;"></h2> -->

I am an incoming Ph.D. student in Computer Science at Arizona State University (ASU), where I will be advised by Prof. [Hua Wei](https://search.asu.edu/profile/3095662) in the [Data Mining and Reinforcement Learning (DaRL) Group](https://labs.engineering.asu.edu/hw/). 
I pursued my master’s study at Beijing Jiaotong University (BJTU), where I was supervised by Prof. [Shengnan Guo](https://faculty.bjtu.edu.cn/9685/) and co-advised by Prof. [Huaiyu Wan](https://faculty.bjtu.edu.cn/8793/).
<!-- I received my Master’s degree in Computer Science and Technology from Beijing Jiaotong University (BJTU), where I was supervised by Prof. [Shengnan Guo](https://faculty.bjtu.edu.cn/9685/) and co-advised by Prof. [Huaiyu Wan](https://faculty.bjtu.edu.cn/8793/).  -->
I am also fortunate to have the opportunity to work with Prof. [Songhe Feng](https://faculty.bjtu.edu.cn/8407/), Prof. [Kaiyu Huang](https://faculty.bjtu.edu.cn/10144/), [Xiaowei Mao](https://scholar.google.com/citations?user=TPjwuDMAAAAJ&hl=zh-CN), and other excellent researchers during my master’s study. 
My main research interests include reinforcement learning, data mining, and large language models.

<div id="mario-fan">
  <p style="margin: 10px 0 0;">
    🍄 Beyond research, I'm a <strong>Nintendo</strong> fan as well! I especially love the
    <strong>Super Mario</strong> series — from the classic side-scrolling platformers to
    <em>Super Mario Odyssey</em> and <em>Luigi's Mansion</em>. Pikmin, Pokémon, and Kirby
    are among my favorites too. I'm drawn to the creativity, charm, and sheer joy these games
    bring, and they often remind me that there's always more than one way to approach a
    challenge — in life and in research alike. <em>Let's-a go!</em> 🎮⭐
  </p>
</div>


{% include_relative _includes/news.md %}

{% include_relative _includes/selected-publications.md %}

<!-- {% include_relative _includes/services.md %} -->

<!-- {% include_relative _includes/contact.md %} -->
