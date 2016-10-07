import rootAppDir from 'app-root-dir'


const rootPath = rootAppDir.get()

class MainCtrl {
    constructor(){}

    redirect() {
        return (req, res) => {
            res.redirect('/')
        }
    }

    sendFile() {
        return (req, res) => {
            res.sendFile(`${rootPath}/assets/index.html`)
        }
    }
}

export default MainCtrl