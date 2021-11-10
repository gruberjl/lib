const apologiesText = 'Apologies, but something went wrong on our end.'
const oneMoreStepText = 'One more step' // Located in h1

const check = async () => {
  console.log(1)

  try {
    console.log(2)

    try {
      console.log(3)
      nonExistentFunction()
    } catch(f) {
      console.log(4)
    }

    console.log(5)
  } catch(e) {
    console.log(6)
  }
}

check()
