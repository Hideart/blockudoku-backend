
import { fromBlankAsync, Workbook } from "xlsx-populate";
import { IChannelPartner, IChannelPartnerReportModel } from "../models/interfaces/channel-partner";

export async function createReport(cp: IChannelPartner[]): Promise<any> {

    return fromBlankAsync().then((workbook: Workbook) => {
        const r = workbook.sheet(0).range(`A1:J${cp.length}`);
        const rangeArr: any[] = [
            [
                'Channel partner',
                'Registered date',
                'Average subscription payment',
                'Subscription date',
                'Active sp',
                'Innactive sp',
                'Total orders',
                'Total sms',
                'Total payment till date',
                'Payment method'
            ]
        ];
        cp.forEach((partner: IChannelPartnerReportModel) => {
            rangeArr.push([
                partner.company,
                partner.createdAt.toISOString().split('T')[0],
                '10000$',
                partner.subscription_due_date.toISOString().split('T')[0],
                '100',
                '50',
                partner.order_price,
                partner.sms_price,
                partner.subscription_due_date.toISOString().split('T')[0],
                partner.payment_method.name,
            ]);
        });
        r.value(rangeArr);

        return workbook.outputAsync('base64');
    });
}