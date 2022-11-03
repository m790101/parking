import React from 'react'
import Navbar from '../components/Navbar'
import '../style/news.scss'

const dummyEvents = [{
    id: 1,
    image: 'https://i.imgur.com/w63HQDP.jpg'
},
{
    id: 2,
    image: 'https://i.imgur.com/tq3Bs2G.jpg'
},
{
    id: 3,
    image: 'https://i.imgur.com/x4AswCs.jpg'
},
{
    id: 4,
    image: 'https://i.imgur.com/w63HQDP.jpg'
},
]
const News = () => {

    

    return (
        <div className='d-flex'>
            <Navbar />
            <div className="events">
                {dummyEvents.map((event) => {
                    return (
                        <div key={event.id} className="events__event">
                            <img src={event.image} alt="" />
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default News