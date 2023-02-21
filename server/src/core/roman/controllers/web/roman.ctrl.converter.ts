import { ICustomExpressRequest, ICustomExpressResponse } from '../../../../types/router.types'
import { EventSourceManager } from '../../../../services/EventSource';

/*
 * Public Controller
 */
const EventSource = new EventSourceManager('roman');

export default async function (req: ICustomExpressRequest, res: ICustomExpressResponse): Promise<void> {
    try {
        const { body }: any = req
        const inputNumber = body.data
        if (['', undefined, null].includes(inputNumber) || inputNumber < 0 || inputNumber > 100) {
            res.error('number', 'enter_a_number')
            return
        }
        res.respond(200, true);
        EventSource.emit(req, ['result'], romanize(inputNumber));
        return
    } catch (e) {
        res.status(500).send(e)
        return
    }
}

function romanize (num:number) {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}