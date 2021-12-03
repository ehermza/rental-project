
const rentalSchema = new Schema({
    number_ctner: Number, from Container

    name_client: String, from Client

    current_debt: Number 
        Rental.getSaldoByCtnerService(id_container)
       
    price_rental: Number
        get = Rental.last_deuda_per
        foreach( Rental.deuda_register.period )
            this= (Rental.deuda_register.value),

    overdue_debt: Number
        difer = this.current_debt - this.price_rental
        this= ( difer > 0) difer ? : 0,

    paid_current_per: Number
        month = Rental.last_deuda_per
        foreach( pagos_register.period == month ) {
            this = pagos_register.value;
            return;
        }
        if (!this)
           this = (last_payment.period == month ) ? last_payment.a_cta: 0;

            
            
})
