var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]

const server = http.createServer((req, res) => {
  const url = req.url

  if(url === '/'){
    res.writeHead(200, { 'Content-Type':'text/html' });
		let html = fs.readFileSync(__dirname +'/html/index.html', 'utf8');
		return res.end(html);
  }

  if(url === '/api'){
    res.writeHead(200, {'Content-Type': 'application/json'});
    return res.end(JSON.stringify(beatles))
  }

  else {
    let nUrl = url.toLowerCase();
    let beatle = beatles.find(e => {
      let name = e.name.toLowerCase().split(' ')
      if(('/'+ name[0]) === nUrl || ('/'+ name[1]) === nUrl) return e
      else return false;
      
    })

    console.log(beatle)

  if (beatle) {
    let html = fs.readFileSync(__dirname +'/html/beatle.html', 'utf8')
    let beatleName = beatle.name;
    let beatleBirthdate = beatle.birthdate;
    let beatleImg = beatle.profilePic;
    

    html = html.replace('{nombre}', beatleName );
    html = html.replace('{birthdate}', beatleBirthdate );
    html = html.replace('{image}', beatleImg);
    res.end(html)
  }
  if (!beatle){
    res.writeHead(404, { 'Content-Type':'text/plain' })
    res.end('Beatle not found...  :c')
  }

  }

})

server.listen(3000, () => console.log('listening on port 3000'));