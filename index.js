const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000

app.use(express.json())
app.use(morgan('dev'))

const data =[
    {
        id:1,
        nombre:"Hechicero Helado",
        PoderMagico:"Manipulacion del hielo",
        CosteDePoder:"500 MP"
    },
    {
        id:2,
        nombre:"Brujo Arcano",
        PoderMagico:"Poderes Arcanos",
        CosteDePoder:"800 MP"
    },
    {
        id:3,
        nombre:"Chaman",
        PoderMagico:"Transformacion Nahual",
        CosteDePoder:"750 MP"
    },
    {
        id:4,
        nombre:"Bruja",
        PoderMagico:"Maldiciones",
        CosteDePoder:"600 MP"
    }
]

app.get("/",(req,res)=>{
    res.send("Hola mundo de Magos")
})
app.get("/data/all",(req,res)=>{
    res.status(200).json(data)
})
app.get("/data",(req,res)=>{
    const query_CosteDePoder=req.query.CosteDePoder
    const query_PoderMagico=req.query.PoderMagico
    if(query_CosteDePoder&&query_PoderMagico){
        const filtro= data.filter(item=>item.CosteDePoder==query_CosteDePoder&&item.PoderMagico==query_PoderMagico)
        if(filtro.length>0){
            res.status(200).json(filtro)
        }else{
            res.status(404).json({message:"No encontrado"})
        }
    }else{
        res.status(302).redirect("/data/all")
    }
})
app.get("/data/:id",(req,res)=>{
    const id_user=req.params.id
    const encontrado = data.find(item=>item.id==id_user)
    if(encontrado){
        res.status(200).json(encontrado)
    }
    else{
        res.status(404).json({message:"No encontrado"})
    }
})

app.post("/data",(req,res)=>{
    const user_body=req.body
    data.push(user_body)
    res.status(201).json(data)
})

app.put("/data/:id",(req,res)=>{
    const user_body= req.body
    const param=req.params.id
    const encontrado=data.findIndex(item=>item.id==param)
    if(encontrado!=-1){
        data[encontrado]=user_body
        res.status(201).json(data)
    }else{
        res.status(404).json({message:"No encontrado"})
    }
})

app.patch("/data/:id", (req, res) => {
    const update_fields = req.body;
    const param = parseInt(req.params.id);
    const index = data.findIndex(item => item.id === param);
    if (index !== -1) {
        data[index] = { ...data[index], ...update_fields };
        res.status(200).json(data[index]);
    } else {
        res.status(404).json({ message: "No encontrado" });
    }
});

app.delete("/data/:id", (req, res) => {
    const param = parseInt(req.params.id);
    const index = data.findIndex(item => item.id === param);
    if (index !== -1) {
        const [deleted] = data.splice(index, 1);
        res.status(200).json(deleted);
    } else {
        res.status(404).json({ message: "No encontrado" });
    }
});

app.listen(port,()=>{
    console.log("Servicio escuchando el puerto: ",port)
})