import { useState, useEffect } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export default function NewsCarousel() {
    const [articles, setArticles] = useState([
        {
            title: "The Rhinoceros, Under Siege but Not Lost",
            image: "/animals/rhino.webp",
            description: "For millennia, the rhinoceros stood as one of Earth’s great survivors, armored and immense, its bulk anchoring the landscapes of Africa and Asia. Today, it’s perilously close to vanishing.",
            link: "https://news.mongabay.com/short-article/2025/09/the-rhinoceros-under-siege-but-not-lost/"
        },
        {
            title: "Orangutans in Sumatra learn to live in the wild",
            image: "/animals/orangutan.jpg",
            description: "Orangutans spend roughly 90% of their time in the tree canopy; it isn’t normal for Willy to want to spend much time on the ground. Willy is a student, so to speak. She’s learning how to be wild.",
            link: "https://www.worldwildlife.org/stories/orangutans-in-sumatra-learn-to-live-in-the-wild"
        },
        {
            title: "Twelve whales have been tangled in shark nets off Queensland’s coast so far this year. Here’s why",
            image: "/animals/whale.avif",
            description: "In the worst case, entanglements could cause drowning, one expert says, but whales can also suffer long-term effects from the nets.",
            link: "https://www.theguardian.com/environment/2025/sep/30/whales-tangled-shark-nets-queensland-coast"
        }
    ])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true
    }

    return (
        <div className="news-carousel">
            <Slider {...settings}>
                {articles.map((article, index) => (
                    <div key={index} className="carousel-slide">
                        <div className="slide-content">
                            <h2>{article.title}</h2>
                            <img src={article.image} alt={article.title} />
                            <p>{article.description}</p>
                            <a href={article.link} className="read-more">Read More →</a>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}