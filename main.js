const BASE_URL = 'https://user-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/users/'
const users = []
const cardContainer = document.querySelector('#user-container')

// 執行程式
renderAllUsers()

//設置監聽器
cardContainer.addEventListener('click', showUserInfo)

// 送出請求，將所有使用者資料抓取下來
function renderAllUsers(){
  axios.get(INDEX_URL)
  .then(res => {
    users.push(...res.data.results)
    renderUserCards()
  })
}

// 將抓取到的使用者資料顯示出來
function renderUserCards(){
  let HTML = ''

  users.forEach(user => {
    HTML += `
   <div class="card m-2" data-bs-toggle="modal" data-bs-target="#user-modal">
     <img class="card-img-top" src="${user.avatar}" alt="Card image cap" data-modal-user-id="${user.id}">
     <div class="card-body" data-modal-user-id="${user.id}">
       <h5 class="card-title mb-0" data-modal-user-id="${user.id}">${user.name} ${user.surname}</h5>
     </div>
   </div>
  `
  })
  cardContainer.innerHTML = HTML
}

// 顯示使用者的更多資訊
function showUserInfo(event){
  const id = event.target.dataset.modalUserId

  if(!id){
    return
  }

const modalTitle = document.querySelector('.modal-title')
const modalavatar = document.querySelector('.modal-avatar')
const modalUserInfo = document.querySelector('.modal-user-info')
  axios.get(INDEX_URL + id)
  .then(res => {
    let user = res.data
    modalTitle.innerText = user.name + '' + user.surname
    modalavatar.src = user.avatar
    modalUserInfo.innerHTML = `
    <p>email:${user.email}</p>
    <p>gender:${user.gender}</p>
    <p>age:${user.age}</p>
    <p>region:${user.region}</p>
    <p>birthday:${user.birthday}</p>
    `
  })
  .catch(err => console.log(err))
}