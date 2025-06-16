import { useEffect, useState } from "react";  // ვა - import - ებთ useEffect და useState კაუჭებს react - ის ბიბლიოთეკიდან
import "./App.css" // ვა - import - ებთ App.css - ის ფაილს ჩვენი ვებ - გვერდის გასასტილად

function App() {
  const [user, setUser] = useState(); // useState - ი აბრუნებს ორ მნიშვნელობას user - ს საწყისი მნიშვნელობა რომელიც უნდა შეიცვალოს და setUser ფუნქციას რომელმაც უნდა შეცვალოს 
  // საწყისი მნიშვენელობა
  const handleSearch = async (username) => { // ვქმნით ასინქრონიზირებულ arrow ფუნქციას სახელად handleSearch, ფუნქცია იღებს ერთ მნიშვნელობას username - ს, მომხმარებლოს სახელს
    try{
      const response = await fetch(`https://api.github.com/users/${username}`); // იქმნება ერთი ცვლადი სახელად response, ამ ცვლადში fetch - ის დახმარებით მოგვაქვს მომხმარებლის ინფორმაცია
      // https://api.github.com/users/${username} კონკრეტული ლინკიდან
      const data = await response.json(); // იქმნება ერთი ცვლადი სახელად data, სადაც ჩვენს მიერ წამოღებული ინფორმაცია გადადის json - ის ფორმატში

      if(data.message === 'Not Found'){ // იმ შემთხვევაში თუ მომხმარებელმა შემოიტანა ისეთი მნიშვნელობა რომელიც არ არსებობს, if - ის გამოყენებით ვამოწმებთ, არის თუ არა json - ის 
      // ფორმატში გადაყვანილი ლინკის ერთ-ერთი კუთვნილება სახელად message - ის მნიშვნელობა Not found - ის ტოლი, იმ შემთხვევაში თუ ეს პირობა სწორია მაშინ
        setUser(null); // setUser - ფუნქციას გადავცემთ null - მნიშვნელობას
        return; // return - ის გამოყენებით შევაჩერებთ ფუნქციას, ეს ნიშნავს იმას რომ საიტზე აღარ მოხდება ზედმეტი ცვლილების მოხდენა
      }

      setUser(data); // იმ შემთხვევაში თუ მომხმარებლის შემოტანილი ინფორმაცია არსებობს მაშინ ჩვენს setUser ფუნციას გადავცემთ json - ის ფორმატში გადაყვანილი ლინკს
      console.log(data);

    }catch(err){ // თუ მომხმარებელმა შემოიტანა ისეთი მნიშვნელობა რომელიც არ არსებობს ჩვენ catch - ის გამოყენებით დავიჭერთ კონკრეტულ error - ს
      console.log(err); // და გამოვიტანთ console - ში
      setUser(null); // setUser - ფუნქციას გადავცემთ null - მნიშვნელობას რადგან კონკრეტული მნიშვნელობა რომელიც მომხმარებელმა შემოიტანა ვერ მოიძებნა
    }
  }

  useEffect(() => { // useEffect - კაუჭის გამოყენებით 
    handleSearch('octocat'); // გამოვიტანთ გადაცემული username - ის ინფორმაციას 
  }, []) // ეს მოხდება მაშინ როდესაც საიტი ჩაიტვირთება

  const handleSubmit = (e) => { // ვქმნით arrow ფუნქციას რომელსაც გადაეცემა ერთი მნიშვნელობა e, event 
      e.preventDefault(); // e.preventDefault() - ის დახმარებით ჩვენ შეგვეძლება, რომ მომხმარებლის ინფორმაცია რომელიც ველში შეიყვანა წამოვიღოთ, e.preventDefault() - ს ვიყენებთ ჩვენ 
      // მაშინ როდესაც არ გვინდა რომ მომხმარებლის მიერ შემოყვანილი ინფორმაცია input - ში და - refresh - დეს

      const username = e.target.username.value; // ვქმნით ახალ ცვლადს სახელად username, e.target.username.value - ის დახმარებით ჩვენ მოგვაქვს მომხამრებლის მიერ შემოტანილი 
      // ინფორმაცია

      handleSearch(username); // handleSearch - ს გადავცემთ username - ს იგივე იმ მნიშვნელობას რომელიც მომხმარებელმა შემოიტანა

      e.target.reset(); // ჩვენს input - ველს ვასუფთავებთ რადგან მომხმარებელმა ხელახლა შეძლოს ინფორმაციის შემოტანა
  }

  const handleDark = () => { // ვქმნით arrow ფუქნციას სახელად handleDark
    const text = document.querySelector('.p1'); // document.querySelector - ის გამოყენებით ვიღებთ წვდომას ელემენტზე კონკრეტული className - ით

    if(text.innerHTML.includes('DARK')) { // ვამოწმებთ თუ text ცვლადში ინფორმაციის innerHTML იგივე შიგთავსი მოიცავს ისეთ მნიშვნელობას როგორიცაა 
      // DARK მაშინ ჩვენ ვცვლით text ცვლადის მნიშვნელობას
      text.innerHTML = 'LIGHT <img src="./src/assets/Theme Icon.svg" class="img2"/>'; // text.innerHTML განვაახლეთ და შევცვალეთ LIGHT <img src="./src/assets/Theme Icon.svg" class="img2" /> - ით
      document.body.classList.add('darkMode'); // ჩვენს document ის ფაილში არსებულ body თეგის classList ში ვამატებთ ახალ className - ს darkMode - ს
    }else{ // სხვა შემთხვევაში თუ text ცვლადში ინფორმაციის innerHTML იგივე შიგთავსი არ მოიცავს მნიშვნელობას სახელად DARK
      text.innerHTML = 'DARK <img src="./src/assets/icon-moon.svg" className="img2"/>'; // მაშინ text - ცვლადის შეგთავსი შეიცვლება და გახდება DARK <img src="./src/assets/icon-moon.svg" className="img2"/>
      // LIGHT <img src="./src/assets/Theme Icon.svg" class="img2" /> მაგივრად
      document.body.classList.remove('darkMode'); // document - ის ფაილში არსებულ body თეგის classList - დან ვშლით ერთ className - ს სახელად  darkMode 
    }
  }


  const createdAt = user ? new Date(user.created_at) : undefined; // იქმნება ახალი ცვლადი სახელად createdAt, ternary operator - ის გამოყენებით ვამოწმებთ იმ შემთხვევაში თუ 
  // user - ის მნიშვნელობა არის დამაკმაყოფილებელი მაშინ ჩვენ Date ობიექტს გადავცემთ user.created_at - ს სხვა შემთხვევაში თუ პირობა არ არის დამაკმაყოფილებელი მაშინ createdAt ცვლადის 
  // მნიშვნელობა იქნება undefined - ის ტოლი

  const year = createdAt ? createdAt.getFullYear() : undefined;  // იქმნება ცვლადი სახელად year, ternary operator - ის გამოყენებით ვამოწმებთ თუ createdAt - ცვლადის მნიშვნელობა არის 
  // true - ს ტოლი მაშინ ამ ცვლადიდან მოგვაქვს წელი getFullYear - ის დახმარებით, სხვა შემთხვევაში თუ createdAt - ცვლადის მნიშვნელობა არის false - ის ტოლი მაშინ year - ცვლადის მნიშვნელობაც 
  // გახდება undefined - ი

  const createdAt2 = user ? new Date(user.created_at) : undefined; // იქმნება ცვლადი სახელად createdAt2, ternary operator - ის გამოყენებით აქაც იგივენაირად ვამოწმებთ  თუ 
  // user - ის მნიშვნელობა არის დამაკმაყოფილებელი მაშინ ჩვენ Date ობიექტს გადავცემთ user.created_at - ს სხვა შემთხვევაში თუ პირობა არ არის დამაკმაყოფილებელი მაშინ createdAt2 ცვლადის 
  // მნიშვნელობა იქნება undefined - ის ტოლი

  const date = createdAt2 ? createdAt2.getDate() : undefined; // იქმნება ცვლადი სახელად date, ternary operator - ის გამოყენებით აქაც იგივენაირად ვამოწმებთ თუ createdAt2 - ის მნიშვნელობა 
  // true - ს უდრის მაშინ წამოვიღებთ თარიღს სხვა შემთხვევაში date ცვლადის მნიშვნელობა შეიცვლება და გახდება undefined - ი


  const createdAt3 = user?.created_at ? new Date(user.created_at) : undefined; // აქაც ანალოგიურად ვამოწმებთ თუ user?.created_at ? ის მნიშვნელობა უდრის true - ს 
  // მაშინ Date ობიექტს გადავცემთ user.created_at - ს სხვა შემთხვევაში ცვლადის მნიშვნელობა undefined - ის ტოლი იქნება
  const monthName = createdAt3 ? createdAt3.toLocaleString(undefined, { month: "short" }) : undefined; // monthName თვე, იმ შემთხვავში თუ createdAt3 - ის ცვლადის მნიშვნელობა 
  // true - ს ტოლია მაშინ toLocaleString - ის გამოყენებით  გადავქცევათ მას სტრინგად toLocaleString - ი იღებს ორ არგუმენტს პირველი არის თარიღის ფორმატი მაგალითად - en-Us არის 
  // ამერიკული თარიღის ფორმატი, მეორე არგუმენტს თუ როგორ უნდა გამოვიდეს თვის სახელი ეკრანზე, მაგალითად "February" ან "Feb" ამ შემთხვევაში 
  // toLocaleString - ს გადაეცემა month: "short" - ეს იმას ნიშნავს რომ თვე გამოვა მოკლედ, სხვა შემთხვევაში თუ createdAt3 - ის მნიშვნელობა არის false - ი მაშინ monthName - ის მნიშვნელობა
  // გახდება undefined - ი 


 return (
  <main>
    <section id="top">
      <img src="./src/assets/Logo (1).svg" className="img1"/>
      <p className="p1" onClick={handleDark}>DARK <img src="./src/assets/icon-moon.svg" className="img2"/></p>
    </section>

    <section id='search'>
      <form onSubmit={handleSubmit}>
        <div className="searchDiv">
          <img src="./src/assets/icon-search.svg" className="img3"/>
          <input type='text' placeholder='Search GitHub username…' name='username' required />
        </div>
        <div>
          {user === null ? (
            <div className="errorInputMessage">
              <p className="errorInputP">No results</p>
              <button>Search</button>
            </div>
          ) : user ? (
             <button>Search</button>
          ) : ''}
        </div>
      </form>
    </section>

    <section id="info">
      {
        user === null ? (
          <div className="errorMessage">
            <h2 className="errorHeading">No results found!</h2>
            <p className="errorP">We couldn't find any Github users matching your search. Please<br /> double-check the username and try again.</p>
          </div>
        ) : user ? (
          <div>
            <div className="userMiniInfo1">
              <img src={user.avatar_url} className="userAvatar"/>
              <div className="userMiniInfo2">
                <div className="userName">
                  <h2 className="userNameHeading">{user.name}</h2>
                  <p className="p2">@{user.login}</p>
                </div>
                <div className="joinedDate">
                  <p className="p3">Joined {date} {monthName} {year}</p>
                </div>
              </div>
            </div>
            <div className="bottom">
              <p className="BioP">{user.bio ? user.bio : "This profile has no bio"}</p>
              <div className="miniInfoABoutFollowers">
                <div className="div1">
                  <p className="p4">Repos</p>
                  <h1>{user.public_repos}</h1>
                </div>
                <div className="div1">
                  <p className="p4">Followers</p>
                  <h1>{user.followers}</h1> 
                </div>
                <div className="div1">
                  <p className="p4">Following</p>
                  <h1>{user.following}</h1>
                </div>
              </div>
              <div className="row">
                <div className="firstColumn">
                  <p className="firstParagraph"><img src="./src/assets/Shape.svg" className="icon"/><span>{user.location ? user.location : "Not Available"}</span></p>
                  <p className="firstColumnP2"><img src="./src/assets/Blog icon.svg" className="icon" />{user.blog ? (<a target="_blank" href={user.blog?.startsWith("http") ? user.blog : `https://${user.blog}`}>{user.blog}</a>) : (<a>Not Available</a>)}</p>
                </div>
                <div className="secondColumn">
                  <p className="p"><img src="./src/assets/Path.svg" className="icon"/>{user.twitter_username ? (<a target="_blank" href={`https://twitter.com/${user.twitter_username}`}>{user.twitter_username}</a>) : (<a>Not Available</a>)}</p>
                  <p className="p"><img src="./src/assets/Company Icon.svg" className="icon"/>{user.company ? (<a target="_blank" href={user.company?.startsWith('@') ? `https://github.com/${user.company.replace('@','')}` : `https//www.google.com/search?q=${user.company}`}>{user.company}</a> ) : (<a>Not Available</a>)}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Please Search user</p>
        )
      }
    </section>
  </main>
 )
}

export default App;