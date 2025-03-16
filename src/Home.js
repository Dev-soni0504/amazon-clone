import React from 'react';
import "./Home.css";
import Product from './Product';

export default function Home() {
  return (
    <div className='home'>
        <div className='home__container'>
            <img className='home__image'
             src="https://img.freepik.com/free-psd/black-friday-super-sale-facebook-cover-banner-template_120329-5177.jpg?t=st=1740553059~exp=1740556659~hmac=3a595a4428f8d768f6c5ef5c6b5b06c84c235919d7fc513532ae0aed954f77ae&w=1380" alt='' />

             <div className='home__row'>
                <Product id="12321342"
                         title="The Lean Startup:How Constant Innovation Creates Radicaaly Successful Businesses Paperback" 
                         price={29.99}
                         image ="https://m.media-amazon.com/images/I/61BFOf9Ap-L._AC_UF1000,1000_QL80_.jpg"
                         rating={5} />
                <Product id="49538094"
                         title="Kenwood Kmix stadn mixer for baking,stylish kitchen mixer with k-beater,Dough hook and whisk,5 litre Glass Bowl"
                         price={239.0}
                         rating={4}
                         image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjwcSZkjSUJk6G6S5TjCAfWEk29nOPOQO7gA&s" alt=''/>
             </div>

             <div className='home__row'>
              <Product id="2344590"
                       title="Fitbit Versa 4 Fitness Watch"
                       price={98.99}
                       rating={4}
                       image="https://watchfactory.in/cdn/shop/products/12.1_f5249a33-25f0-47b2-a90f-570ab8a9f23c.jpg?v=1711788825" alt=''/>
              <Product id="23445930"
                       title="Amazon echo (3rd generation) | Smart speaker with Alexa ,Charcol Fabric"
                       price={98.99}
                       rating={5}
                       image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtaYMjGINw00LMLigjbdKWrNeJ8z3keni6wg&s"alt=''/>
              <Product id="3254354345"
                       title="New Apple ipad pro (12.9-inch)wifi,(128gb)-Silver (4th Gneration)"
                       price={598.99}
                       rating={4}
                       image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxT6YU-9p_u_zZzbWBAnh9alJgi-QEE5OFXQ&s"alt=''/>
             </div>

             <div className='home__row'>
              <Product id="90829332"
                       title="Samsung LC49RG90SSIXEN 49' Curved LED Gaming Monitor-Super Ultra wide Dual QWHD 5120 * 1440"
                       price={199.99}
                       rating={3}
                       image="https://product.newcomme.com/wp-content/uploads/2022/07/samsung-49-ultra-wide-screen-curved-monitor-with-metal-quantum-dot-technology-lc49hg90dmmxue-6-1200x675.jpg" alt=''/>
             </div>
        </div>
    </div>
  )
}
