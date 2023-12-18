//const express=require('express')
const  Pool = require('../database')

module.exports={
    createSubCategory:async(req,res)=>{

        try{
        const{
                category_name,
                parent_category

            }=req.body;
            

            const  subcategory = await Pool.query(
                'INSERT INTO interview_questions_sub_category(category_name,parent_category) VALUES($1,$2) RETURNING *',
                [category_name, parent_category]
            );

            return res.status(200).json({
                response_code:'200',
                response_message:'Success',
                Data:subcategory.rows[0]
            });
            

        }catch(error){
            console.log(error);
            res.status(500).send('Server Error');

        }

    },

    getSubCategory:async(req,res)=>{

        try{
            const  subcategory = await Pool.query(
                'SELECT id,category_name, parent_category FROM interview_questions_sub_category '
            );
            return res.status(200).json({
                response_code:'200',
                response_message:'Success',
                Data:subcategory.rows
            });
            
        }catch(error){
            console.log(error);
            res.status(500).send('server Error');
        }

    },

    getSubCategoryById:async(req,res)=>{
        try{
            const {id}=req.params;
            const subcategory = await Pool.query(
                'SELECT category_name,parent_category FROM interview_questions_sub_category WHERE id=$1',
                [id]
            );
            return res.status(200).json({
                response_code:'200',
                response_message:'Success',
                Data:subcategory.rows[0]
            });

        }catch(error){
            console.log(error);
            res.status(500).send('server Error');
        }
    },

    updateSubCategoryById:async(req,res)=>{
        try{
            const id=req.params.id;
            const {category_name, parent_category }=req.body;
            const subcategory = await Pool.query(
                "UPDATE interview_questions_sub_category SET category_name=$1, parent_category=$2 WHERE id=$3 RETURNING *",
                [category_name, parent_category,id]
            ) ;
            return res.status(200).json({
                response_code:'200',
                response_message:'Success',
               // Data:({message:'SubCategory Updated successfully.. '}),
                data:subcategory.rows[0]

            });

        }catch(error){
            console.log(error);
            res.status(500).send('server Error');
        }
    },
    
    deleteSubCategoryById:async(req,res)=>{
        try{

            const id=req.params.id;
            const subcategory  = await Pool.query(
                'DELETE FROM interview_questions_sub_category WHERE id=$1 RETURNING *',[id]
            );

            if (subcategory.rows.length === 0) {
                return res.status(404).json({ message: "sub category not found" });
              }
             return res.status(200).json({
                response_code:'200',
                response_message:'Success',
               // Data:({message:'SubCategory Updated successfully.. '}),
               // data:subcategory.rows[0]

            });

        }catch(error){
            console.log(error);
            res.status(500).send("server error");
        }
    }

}