import os
import datetime
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_RIGHT
from reportlab.lib import colors
from reportlab.platypus import Image, Paragraph, Table, TableStyle

# X and Y Measurement starts from the bottom left corner of the page


def _register_lato_as_font():
    '''
    The function registers the Lato-Regular, Lato-Light fonts to the pdfmetrics
    '''
    lato_regular = 'Lato-Regular.ttf'
    lato_light = 'Lato-Light.ttf'
    pdfmetrics.registerFont(TTFont('Lato-Regular', lato_regular))
    pdfmetrics.registerFont(TTFont('Lato-Light', lato_light))


def _create_top_bottom_rectangles(my_canvas, letter_height_in, letter_width_in, desired_height_in, desired_width_in):
    '''
    The function creates top and bottom rectangles with a certain color so that
    the invoice has some good definition from top to bottom
    '''
    top_rect_x = 0
    top_rect_y = letter_height_in - desired_height_in
    top_rect_width = desired_width_in
    top_rect_height = desired_height_in

    bottom_rect_x = 0
    bottom_rect_y = 0
    bottom_rect_width = desired_width_in
    bottom_rect_height = 1

    # This should be RGB(35, 31, 32)
    # my_canvas.setFillColorRGB(0.1372, 0.1215, 0.1254)
    my_canvas.setFillColorRGB(0.3607, 0.3607, 0.3607)
    my_canvas.rect(
        top_rect_x,
        top_rect_y * inch,
        top_rect_width * inch,
        top_rect_height * inch,
        stroke=0, fill=1
    )
    my_canvas.rect(
        bottom_rect_x,
        bottom_rect_y,
        bottom_rect_width * inch,
        bottom_rect_height * inch,
        stroke=0, fill=1
    )
    # my_canvas.setFillColor(colors.black)


def _create_top_rectangle_table(my_canvas, invoice_number, top_rect_height, letter_height_in, letter_width_in):
    '''
    The function creates a table for the above rectangle where the invoice
    number, date and address will be displayed
    '''
    # Create Image for the logo and adjust its height and width
    logo_top_left = Image(
        './ClientAdmin/generate_invoice/innocelf-logo-invoice.jpg'
    )
    logo_top_left.drawHeight = 0.6 * inch
    logo_top_left.drawWidth = 2 * inch

    # Write the address
    address_top_right = Paragraph(
        '''
        <para leading="20">
        <font color="white" size=15 name="Lato-Light">
        <b>Innocelf LLC</b><br/>
        48342 Carnegie Way,<br/>
        Macomb, Michigan 48042<br/>
        pranita.dharmadhikari@innocelf.com<br/>
        248-606-2236
        </font>
        </para>
        '''
    )

    # Write the invoice and date information
    todays_date = datetime.date.today().strftime('%m/%d/%Y')
    invoice_num_date = Paragraph(
        f'<para leading=20 leftindent=20><font color="white" size=13 name="Lato-Light">Invoice No. {invoice_number}<br/>Date. {todays_date}</font></para>'
    )

    # Create table data
    data = [
        [logo_top_left, address_top_right],
        [invoice_num_date]
    ]
    row_heights = (top_rect_height / 2) * inch
    table_y = (letter_height_in - top_rect_height)
    table = Table(data, rowHeights=[row_heights, row_heights], style=[
        ('VALIGN', (0, 0), (0, 0), 'TOP'),
        ('TEXTCOLOR', (0, 0), (-1, -1), colors.white),
        ('VALIGN', (1, 0), (1, 0), 'MIDDLE'),
        ('VALIGN', (0, 1), (0, 1), 'MIDDLE'),
        ('SPAN', (1, 0), (1, 1)),
        # ('BOX', (0, 0), (-1, -1), 1, colors.red),
        # ('INNERGRID', (0, 0), (-1, -1), 1, colors.red),
    ])
    table.wrap(letter_width_in * inch, top_rect_height * inch)
    table.drawOn(my_canvas, 0, table_y * inch)


def _create_bottom_rectangle_table(my_canvas, bottom_rect_height, letter_height_in, letter_width_in):
    '''
    The function creates a table for the bottom rectangle of the page for
    displaying some more information
    '''
    normal_center_para_style = ParagraphStyle(
        name="normal_center", alignment=TA_CENTER, fontName="Lato-Light")

    company_name = Paragraph(
        '<font color="white" size=15>Innocelf, LLC</font>',
        style=normal_center_para_style
    )
    website = Paragraph(
        '<font color="white" size=15>www.innocelf.com</font>',
        style=normal_center_para_style
    )
    phone = Paragraph(
        '<font color="white" size=15>+1 248-606-2236</font>',
        style=normal_center_para_style
    )

    data = [
        [company_name, website, phone]
    ]
    row_height = bottom_rect_height * inch
    table = Table(
        data,
        rowHeights=[row_height],
        style=[
            ('VALIGN', (0, 0), (-1, 0), 'MIDDLE'),
            # ('BOX', (0, 0), (-1, -1), 1, colors.red),
            # ('INNERGRID', (0, 0), (-1, -1), 1, colors.red),
        ]
    )
    table.wrap(letter_width_in * inch, bottom_rect_height * inch)
    table.drawOn(my_canvas, 0, 0)


def _create_table_heads(my_canvas, des_height, des_y_pos, letter_height_in, letter_width_in):
    '''
    The function creates table heads for the Services, Quantity and Cost for each
    service
    '''
    normal_left_para_style = ParagraphStyle(
        name="normal_left",
        fontName="Lato-Regular",
        leftIndent=50,
        fontSize=15
    )
    normal_center_para_style = ParagraphStyle(
        name="normal_center",
        alignment=TA_CENTER,
        fontName="Lato-Regular",
        fontSize=15
    )
    normal_right_para_style = ParagraphStyle(
        name="normal_right",
        alignment=TA_RIGHT,
        fontName="Lato-Regular",
        rightIndent=50,
        fontSize=15
    )

    service_desc = Paragraph(
        'Service Description',
        style=normal_left_para_style
    )
    quantity = Paragraph(
        'Quantity',
        style=normal_center_para_style
    )
    cost = Paragraph(
        'Cost',
        style=normal_right_para_style
    )

    data = [
        [service_desc, quantity, cost]
    ]
    row_height = des_height * inch
    first_col_width = 4.5
    sec_thrd_col_width = (letter_width_in - first_col_width) / 2
    table = Table(
        data,
        colWidths=[first_col_width * inch, sec_thrd_col_width *
                   inch, sec_thrd_col_width * inch],
        rowHeights=[row_height],
        style=[
            ('VALIGN', (0, 0), (-1, 0), 'MIDDLE'),
            # ('INNERGRID', (0, 0), (-1, 0), 0.25, colors.black),
            # ('BOX', (0, 0), (-1, 0), 0.25, colors.black),
        ]
    )
    table.wrap(letter_width_in * inch, des_height * inch)
    table.drawOn(my_canvas, 0, des_y_pos * inch)


def _create_table_body(my_canvas, des_height, des_y_pos, letter_height_in, letter_width_in, services_list):
    '''
    The function creates the table body for enumerating all the services and costs
    associated with them
    '''
    normal_left_para_style = ParagraphStyle(
        name="normal_left",
        fontName="Lato-Light",
        leftIndent=50,
        fontSize=15
    )
    normal_center_para_style = ParagraphStyle(
        name="normal_center",
        alignment=TA_CENTER,
        fontName="Lato-Light",
        fontSize=15
    )
    normal_right_para_style = ParagraphStyle(
        name="normal_right",
        alignment=TA_RIGHT,
        fontName="Lato-Light",
        rightIndent=50,
        fontSize=15
    )

    data = []
    for item in services_list:
        service_provided = Paragraph(item[0], style=normal_left_para_style)
        quantity = Paragraph(str(item[1]), style=normal_center_para_style)
        cost = Paragraph('${:,.2f}'.format(
            item[2]), style=normal_right_para_style)

        each_item = [service_provided, quantity, cost]
        data.append(each_item)

    row_height = des_height * inch / len(services_list)
    first_col_width = 4.5
    sec_thrd_col_width = (letter_width_in - first_col_width) / 2
    table = Table(
        data,
        colWidths=[first_col_width * inch, sec_thrd_col_width *
                   inch, sec_thrd_col_width * inch],
        rowHeights=row_height,
        style=[
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            # ('INNERGRID', (0, 0), (-1, 0), 0.25, colors.black),
            # ('BOX', (0, 0), (-1, -1), 1, colors.red),
            # ('INNERGRID', (0, 0), (-1, -1), 1, colors.red),
        ]
    )
    table.wrap(letter_width_in * inch, des_height * inch)
    table.drawOn(my_canvas, 0, des_y_pos * inch)


def _create_table_footer(my_canvas, des_height, des_y_pos, letter_height_in, letter_width_in, total_amount):
    '''
    The function creates the table footer which includes the total amount that 
    will be charged
    '''
    normal_center_para_style = ParagraphStyle(
        name="normal_center",
        alignment=TA_CENTER,
        fontName="Lato-Regular",
        fontSize=15
    )
    normal_right_para_style = ParagraphStyle(
        name="normal_right",
        alignment=TA_RIGHT,
        fontName="Lato-Regular",
        rightIndent=50,
        fontSize=15
    )

    total = Paragraph(
        'TOTAL',
        style=normal_center_para_style
    )
    cost = Paragraph(
        '${:,.2f}'.format(total_amount),
        style=normal_right_para_style
    )

    data = [
        ['', total, cost]
    ]
    row_height = des_height * inch
    first_col_width = 4.5
    sec_thrd_col_width = (letter_width_in - first_col_width) / 2
    table = Table(
        data,
        colWidths=[first_col_width * inch, sec_thrd_col_width *
                   inch, sec_thrd_col_width * inch],
        rowHeights=[row_height],
        style=[
            ('VALIGN', (0, 0), (-1, 0), 'MIDDLE'),
            # ('INNERGRID', (0, 0), (-1, 0), 0.25, colors.black),
            ('BOX', (0, 0), (-1, 0), 2, colors.black),
        ]
    )
    table.wrap(letter_width_in * inch, des_height * inch)
    table.drawOn(my_canvas, 0, des_y_pos * inch)


def sending_to_table(my_canvas, des_height, des_y_pos, letter_height_in, letter_width_in, name_address_list):
    '''
    The function creates the sending information or the recipients information
    at the top of the invoice
    '''
    para_style = ParagraphStyle(
        name='para_style',
        leading=16,
        leftIndent=50,
        textColor=colors.black,
        fontSize=12,
        fontName='Lato-Light'
    )

    concat_string = 'To,<br/>'
    for line in name_address_list:
        concat_string += line + '<br/>'

    recipient_info = Paragraph(concat_string, style=para_style)

    data = [
        [recipient_info]
    ]
    row_height = des_height * inch
    table = Table(
        data,
        rowHeights=[row_height],
        style=[
            ('VALIGN', (0, 0), (-1, 0), 'MIDDLE'),
            # ('BOX', (0, 0), (-1, 0), 0.25, colors.black),
        ]
    )
    table.wrap(letter_width_in * inch, des_height * inch)
    table.drawOn(my_canvas, 0, des_y_pos * inch)


def payable_to_table(my_canvas, des_height, des_y_pos, letter_height_in, letter_width_in):
    '''
    The function creates a table for displaying the Payable to information in
    the invoice
    '''
    normal_right_para_style = ParagraphStyle(
        name="normal_right",
        alignment=TA_RIGHT,
        fontName="Lato-Light"
    )

    payable_to_info = Paragraph(
        '''
        <para leading=15 leftindent=50>
        <font color="black" size=13 name="Lato-Light">
        Payable To:<br/>
        <br/>
        Innocelf, LLC<br/>
        A/C No.: 4534539338<br/>
        Routing No.: 241 070 417<br/>
        Bank Name: Citizens Bank NA
        </font>
        </para>
        '''
    )
    thank_you = Paragraph(
        '''
        <para leading=35 rightindent=50>
        <strong>
        <font color="black" size=30>THANK<br/>YOU</font>
        </strong>
        </para>
        ''',
        style=normal_right_para_style
    )

    data = [
        [payable_to_info, thank_you]
    ]
    row_height = des_height * inch
    table = Table(
        data,
        rowHeights=[row_height],
        style=[
            ('VALIGN', (0, 0), (-1, 0), 'MIDDLE'),
            # ('BOX', (0, 0), (-1, 0), 0.25, colors.black),
        ]
    )
    table.wrap(letter_width_in * inch, des_height * inch)
    table.drawOn(my_canvas, 0, des_y_pos * inch)


def create_canvas_and_save(pdf_path, invoice_number, name_address_list, services_list, total_amount):
    '''
    The function creates an empty canvas adds all the necessary items to it 
    and saves it as a PDF
    '''
    # Register Lato-Light and Lato-Regular as fonts
    _register_lato_as_font()

    # Letter dimensions
    letter_height_in = 11
    letter_width_in = 8.5

    # Create Canvas
    my_canvas = canvas.Canvas(pdf_path, pagesize=letter)

    # Create top and bottom rectangles
    top_rect_height = 1.7
    _create_top_bottom_rectangles(
        my_canvas,
        letter_height_in,
        letter_width_in,
        top_rect_height,
        letter_width_in
    )

    # Create top rectangle table
    _create_top_rectangle_table(
        my_canvas,
        invoice_number,
        top_rect_height,
        letter_height_in,
        letter_width_in
    )

    # Create bottom rectangle table
    _create_bottom_rectangle_table(
        my_canvas,
        1,
        letter_height_in,
        letter_width_in
    )

    # Create payable to table (with bank account info)
    payable_to_table(
        my_canvas,
        1.5,
        1,
        letter_height_in,
        letter_width_in
    )

    # Create Client Information table
    sending_to_table(
        my_canvas,
        1.5,
        7.8,  # 7.5
        letter_height_in,
        letter_width_in,
        name_address_list
    )

    # Create table heads for service, quantity and cost
    _create_table_heads(
        my_canvas,
        0.5,
        7.3,
        letter_height_in,
        letter_width_in,
    )

    # Create table bottom / footer that carries the total
    _create_table_footer(
        my_canvas,
        0.5,
        3,
        letter_height_in,
        letter_width_in,
        total_amount
    )

    # Create table body with all the information
    _create_table_body(
        my_canvas,
        3.8,
        3.5,
        letter_height_in,
        letter_width_in,
        services_list
    )

    my_canvas.showPage()
    my_canvas.save()


if __name__ == '__main__':
    name_address_list = [
        'Miraki Innovations, LLC',
        '44 Brattle Street, 4th Floor',
        'Harvard Square',
        'Cambridge, MA 02138'
    ]
    # Limit 10 services list
    services_list = [
        ['Patentability Search', 1, 500],
        # ['FTO Search', 1, 1000],
        # ['Some Other Search', 1, 1000],
        # ['Some Other Search', 1, 1000],
        # ['Some Other Search', 1, 1000],
        # ['Some Other Search', 1, 1000],
        # ['Some Other Search', 1, 1000],
        # ['Some Other Search', 1, 1000],
        # ['Some Other Search', 1, 1000],
        # ['Some Other Search', 1, 1000],
    ]
    create_canvas_and_save('sample.pdf', '21-7002',
                           name_address_list, services_list)
