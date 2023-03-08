 const scaleNames= {
    c: 'Celsius',
    f: 'Fahrenheit'
 }
 const phrase = "Bienvenue dans mon convertisseur de temperature"
 function Titre (){
   return <div>
      <h1 className="text-center">
         {phrase}
      </h1>
   </div>
 }

 function ToCelsius(fahrenheit){
    return (fahrenheit - 32) * 5 / 9
 }
 function ToFahrenheit(celsius){
    return (celsius * 9/5) + 32
 }
 
 function BoilinVerding ({celsius}){
    if (celsius >= 100){
        return <div className = "alert alert-success"> L'eau bout  </div>
    } else 
    return <div className="alert alert-info"> l'eau ne bout pas </div>

 }
 function tryconvert(temperature, convert){
    const value = parseFloat(temperature)
    if(Number.isNaN(value)){
        return ''
    }else
    return (Math.round(convert(value) * 100 ) / 100).toString()
 }
 class Temperatureinput extends React.Component{
     constructor (props){
        super(props)
        this.handlechange = this.handlechange.bind(this)
     }
     handlechange (e){
       this.props.onTemperatureChange(e.target.value)
    }
     render(){
        const{temperature} = this.props
        const name = 'scale' + this.props.scale 
        const scaleName = scaleNames[this.props.scale]
        return <div className="form-group">
           <label htmlFor={name}> Temperature (en {scaleName})</label>
          <input type="text" id={name} value ={temperature} className="form-control" onChange={this.handlechange}/>
          </div>

     }
 }

 class Calculator extends React.Component{
    constructor (props){
        super(props)
        this.state = {
            scale:'c',
            temperature : 20
        }
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
    }
     handleCelsiusChange (temperature){
        this.setState({
            scale: 'c',
            temperature})
     }
     handleFahrenheitChange (temperature){
        this.setState({
            scale: 'f',
            temperature})
     }
    render(){
        const{temperature, scale} = this.state
        const celsius = scale === 'c' ? temperature : ToCelsius(temperature)
        const fahrenheit = scale === 'f' ? temperature: ToFahrenheit(celsius) 
          return <div>
        <Temperatureinput scale="c"temperature={celsius} onTemperatureChange={this.handleCelsiusChange}/>
        <Temperatureinput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}/>
        <BoilinVerding celsius={parseFloat(celsius)}/>
    </div>
    }
 }



ReactDOM.render(<Calculator/>, document.querySelector("#app"))
ReactDOM.render(<Titre/>, document.querySelector("#app2"))