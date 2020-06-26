new Vue({
    el: '#app',
    data: {
        // 사용자가 선택하는 라디오 버튼의 초기값
        myChoice: null,
        comChoice: null,
        count: 3,
        winner: null,
        lifeOfMe: 3,
        lifeOfCom: 3,
        //선택 버튼 유무를 위한 변수
        isSelectable: true,
        //결과 출력을 위한 배열
        logs: []
    },
    watch: {
        count: function (newVal) {
            if (newVal === 0) {
                let number = Math.floor(Math.random()*10)%3
                if (number === 0) {
                    this.comChoice = 'scissor'
                } else if (number === 1) {
                    this.comChoice = 'rock'
                } else if (number === 2){
                    this.comChoice = 'paper'
                }

                //가위바위보 승패 결정
                if (this.myChoice === this.comChoice) this.winner = 'no one'
                else if (this.myChoice === 'rock' && this.comChoice === 'scissor') this.winner = 'me'
                else if (this.myChoice === 'scissor' && this.comChoice === 'paper') this.winner = 'me'
                else if (this.myChoice === 'paper' && this.comChoice === 'rock') this.winner = 'me'
                else if (this.myChoice === 'scissor' && this.comChoice === 'rock') this.winner = 'com'
                else if (this.myChoice === 'paper' && this.comChoice === 'scissor') this.winner = 'com'
                else if (this.myChoice === 'rock' && this.comChoice === 'paper') this.winner = 'com'
                else this.winner = 'error'

                //몫 차감
                if (this.winner === 'me') {
                    this.lifeOfCom--
                } else if (this.winner === 'com') {
                    this.lifeOfMe--
                }
                this.count = 3

                //선택완료 버튼이 다시 보여짐
                this.isSelectable = true

                //결과 출력
                let log = {
                    message: `You : ${this.myChoice}, Computer : ${this.comChoice}`,
                    winner: this.winner
                }


                //화면에 가장 최신순으로 로그를 찍어준다
                this.logs.unshift(log);
            }
        },
        lifeOfMe: function (newVal) {
            if (newVal === 0) {
                setTimeout(() => {
                    confirm('안타깝네요. 당신이 패배하였습니다.')
                    this.lifeOfMe = 3
                    this.lifeOfCom = 3
                    this.myChoice = null
                    this.comChoice = null
                    this.winner = null
                    this.log = []
                }, 500)

            }
        },
        lifeOfCom: function (newVal) {
            if (newVal === 0) {
                setTimeout(() => {
                    confirm('축하합니다. 당신이 승리하였습니다.')
                    this.lifeOfMe = 3
                    this.lifeOfCom = 3
                    this.myChoice = null
                    this.comChoice = null
                    this.winner = null
                    this.log = []
                }, 500)

            }

        }
    },
    methods: {
        startGame: function () {
            /*
                선택완료 버튼이 보이지 않음
            */
            this.isSelectable = false

            if (this.myChoice === null) {
                alert('가위 바위 보 중 하나를 선택해주세요.')
            } else{
                let countDown = setInterval(() => {
                    this.count--
                    if (this.count === 0) {
                        clearInterval(countDown)
                    }
                }, 1000)
            }
        }
    }
})
