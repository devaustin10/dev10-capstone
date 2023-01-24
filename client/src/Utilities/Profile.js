

const Profile = () => {
    return (
        <div className="profile col-lg-6 offset-lg-5">
        <img className="img-fluid mt-5" src={process.env.PUBLIC_URL + "/images/rengoku.png"} alt="Home page" />
            <h1>John Doe</h1>
            <p className="title">CEO & Founder, Example</p>
            <p>Harvard University</p>
            <p><button>Contact</button></p>
        </div>    
    )
};
export default Profile;

//     <div>
//     <img className="img-fluid mt-5" src={process.env.PUBLIC_URL + "/images/rengoku.png"} alt="Home page" />
//         <h1>John Doe</h1>
//         <p class="title">CEO & Founder, Example</p>
//         <p>Harvard University</p>
//         <p><button>Contact</button></p>
//     </div>    
// }
// }
// export default Profile;
//after second p tag
//line 3 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

//under contact         <a href="#"><i class="fa fa-dribbble"></i></a>
        // <a href="#"><i class="fa fa-twitter"></i></a>
        // <a href="#"><i class="fa fa-linkedin"></i></a>
        // <a href="#"><i class="fa fa-facebook"></i></a>