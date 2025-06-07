console.log("Script loaded successfully!");

//html elements
const share_div = document.querySelector('.share_div')
const share_button = document.querySelector('.share_button');
const share_button_svg_path = document.querySelector('.share_button svg path');
const avatar = document.querySelector('.avatar');
const footer = document.querySelector('footer');
const html_syntax_share = `<div class="inserted_div">
                                <p id="p_inserted">SHARE</p>
                                <div class="social_icons">
                                    <img id="icon-facebook" src="images/icon-facebook.svg" alt="facebook icon"> 
                                    <img id="icon-twitter" src="images/icon-twitter.svg" alt="twitter icon"> 
                                    <img id="icon-pinterest" src="images/icon-pinterest.svg" alt="pinterest icon">
                                </div>
                            </div>`

//var Functions
isMobile =()=> window.matchMedia('(max-width:999px)').matches;
isDesktop =()=> window.matchMedia('(min-width:1000px)').matches;
desktop_dummyVar =()=> getComputedStyle(avatar).getPropertyValue('--js-toggle-desktop');

// colors;
const Very_Dark_Grayish_Blue = getComputedStyle(document.documentElement).getPropertyValue("--Very_Dark_Grayish_Blue");
const Grayish_Blue = getComputedStyle(document.documentElement).getPropertyValue('--Grayish_Blue')
const Light_Grayish_Blue = getComputedStyle(document.documentElement).getPropertyValue('--Light_Grayish_Blue')
const Desaturated_Dark_Blue = getComputedStyle(document.documentElement).getPropertyValue('--Desaturated_Dark_Blue')


//screen specific functions
function mobile_toggleshare(){
    if (getComputedStyle(avatar).display === 'flex' && isMobile()) {
    avatar.style.display = 'none';
    footer.style.backgroundColor = Very_Dark_Grayish_Blue;
    footer.insertAdjacentHTML('afterbegin', html_syntax_share);
    share_button_svg_path.style.fill = '#ffffff';
    share_button.style.backgroundColor = Desaturated_Dark_Blue ;
    console.log('Mobile Button')
    }
    else if(getComputedStyle(avatar).display === 'none' && isMobile()){
    avatar.style.display = 'flex';
    footer.style.backgroundColor = '#ffffff';
    const insertedDiv = document.querySelector('.inserted_div');
    if (insertedDiv) {
        insertedDiv.remove();
    }
    share_button_svg_path.style.fill = Grayish_Blue;
    share_button.style.backgroundColor = Light_Grayish_Blue;
    console.log('Mobile Button')
    }  
}

function desktop_toggleshare(){
    //checking for any leftovers
    const insertedDiv = document.querySelector('.inserted_div');
    if (insertedDiv) {
        insertedDiv.remove();
    }
    
    //The functions actual logic
    if (desktop_dummyVar() === '1' && isDesktop()){
        share_div.insertAdjacentHTML('afterbegin', html_syntax_share);
        avatar.style.setProperty('--js-toggle-desktop',0);
        share_button_svg_path.style.fill = '#ffffff';
        share_button.style.backgroundColor = Desaturated_Dark_Blue ;
        console.log('Desktop Button');
    }
    else if(desktop_dummyVar() === '0' && isDesktop()){
        avatar.style.setProperty('--js-toggle-desktop',1);
        share_button_svg_path.style.fill = Grayish_Blue;
        share_button.style.backgroundColor = Light_Grayish_Blue ;
        console.log('Desktop Button');
    }
    

};

function updateShareButtonListener() {
    if (isMobile()) {
        share_button.removeEventListener('click', desktop_toggleshare);
        share_button.addEventListener('click', mobile_toggleshare);
    } else if (isDesktop()) {
        share_button.removeEventListener('click', mobile_toggleshare);
        share_button.addEventListener('click', desktop_toggleshare);
    }
}

window.addEventListener('resize', updateShareButtonListener);
updateShareButtonListener(); 







