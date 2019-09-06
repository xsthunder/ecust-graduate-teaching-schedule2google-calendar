
# coding: utf-8

# In[36]:


input_string = """
第1节  08:00-08:45            第5节  13:30-14:15              第9节   18:00-18:45  
第2节  08:55-09:40            第6节  14:25-15:10             第10节  18:55-19:40
第3节  09:55-10:40            第7节  15:25-16:10              第11节  19:55-20:40
第4节  10:50-11:35            第8节  16:20-17:05              第12节  20:50-21:35
"""
import re
weekday = list(map(list, sorted(re.findall('第(\d{1,2})节\s*([\d:]+)-([\d:]+)',input_string, ), key=lambda x:int(x[0])), ) )


# In[37]:


input_string = """
第1节  08:00-08:45            第5节  12:15-13:00              第9节   15:45-16:30
第2节  08:55-09:40            第6节  13:05-13:50              第10节  16:35-17:20
第3节  09:55-10:40            第7节  14:00-14:45              第11节  17:25-18:10
第4节  10:50-11:35            第8节  14:50-15:35              第12节  18:15-19:00
"""
import re
weekend = list(map(list, sorted(re.findall('第(\d{1,2})节\s*([\d:]+)-([\d:]+)',input_string, ), key=lambda x:int(x[0])), ) )


# In[38]:

import json
print(json.dumps({
    'weekday':weekday,
    'weekend':weekend,
}))

