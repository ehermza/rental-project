import Container, { IContainer } from "../models/Container"
import GlobalDt, { IGlobalDt } from "../models/GlobalDt";
import { ObjectID } from 'mongodb'


export async function getCurrentPerService() {
    try {
        const filter = { "info": 261 };

        const objGlobalDt:IGlobalDt|null = await GlobalDt.findOne(filter);
            
        // await GlobalDt.findById(
        //     new ObjectID("61d7251e9825e458c78bc57e")
        // );
        return (objGlobalDt!= null)? objGlobalDt.currentDebtPer: "globaldt not found";

    } catch (error) {
        
    }
}
export async function getContainersServ(): Promise<IContainer[]> {
    try {
        // return await Container.find({ rented_by: { $ne: '' }}).sort({id_container:-1});
        // return await Container.find();
        return await Container.find().sort({id_container:-1});
    }
     catch (error) {
        throw new Error();
    }
}

export async function getContainerOneServ(id: ObjectID) {

    try {
        return await Container.findById(id);
    }
    catch (error) {
        throw new Error();
    }
}

export async function getPriceContainerService(id:ObjectID): Promise<Number> {
    try {
        const cont: IContainer| null =  await Container.findById(id);
        if (!cont) 
            return -1;
        return cont.price_tocharge;

    } catch (error) {
        throw new Error();
    }
}
export async function getContByNumberService(idctner: Number) {

    try {
        const filter = {'id_container': idctner.toString()};
        return await Container.findOne(filter);
    } catch (error) {
        throw new Error();
    }
}

export async function createContainerServ(objprod: IContainer) {
    try {
        return await objprod.save();
        // console.log(objprod);
    }
    catch (error) {
        throw new Error();
    }
}

export async function updateContainerServ(id:ObjectID, objprod:IContainer) {
    try {
        return await Container.findByIdAndUpdate(id, objprod);        
    } catch (error) {
        throw new Error();
        
    }
}

export async function deleteContainerServ(id:ObjectID) {
    try {
        return await Container.findByIdAndDelete(id);
    } catch (error) {
        throw new Error();
        
    }
}

/**
 * Code written by ehermza Date: August 08th, 2021.
 */
