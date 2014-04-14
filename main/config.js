module.exports =
{
version: '1.0'
    ,
basePath : ''
    ,
language : 'en'
    ,
timeZone : 'Asia/Shanghai'
    ,
viewCodeTag :
    /<%(.*?)%>/g,
    viewLayouts : 'main.html'
    ,
    autoIncludePath:
    [
        'controller',
        'model',
        'components',
        'extends',
    ],
    db:
    {
main:
        {
'host': '192.168.1.108'
            ,
'user': 'root'
            ,
'password': 'root'
            ,
'database': 'financialmanagement'
        },
slave:
        {
'host': '192.168.1.108'
            ,
'user': 'root'
            ,
'password': 'root'
            ,
'database': 'financialmanagement'
        },
cache:
        {
'host': '192.168.1.108'
            ,
'user': 'root'
            ,
'password': 'root'
            ,
'database': 'financialmanagement'
        }
    },
log :
    {
status:
        true
    }
};