Search.setIndex({envversion:46,filenames:["index","seldon","seldon.microservice","seldon.pipeline","seldon.text"],objects:{"":{seldon:[1,0,0,"-"]},"seldon.NullHandler":{emit:[1,2,1,""]},"seldon.fileutil":{FileUtil:[1,1,1,""]},"seldon.fileutil.FileUtil":{copy:[1,2,1,""],copy_local:[1,2,1,""],copy_s3_file:[1,2,1,""],download_s3:[1,2,1,""],getFolders:[1,2,1,""],stream:[1,2,1,""],stream_decompress:[1,2,1,""],stream_gzip:[1,2,1,""],stream_local:[1,2,1,""],stream_multi:[1,2,1,""],stream_s3:[1,2,1,""],stream_text:[1,2,1,""],upload_s3:[1,2,1,""]},"seldon.keras":{KerasClassifier:[1,1,1,""],default_classification_model:[1,3,1,""]},"seldon.keras.KerasClassifier":{"__getstate__":[1,2,1,""],"__setstate__":[1,2,1,""],fit:[1,2,1,""],predict_proba:[1,2,1,""]},"seldon.microservice":{microservice:[2,0,0,"-"],predict:[2,0,0,"-"],recommend:[2,0,0,"-"]},"seldon.microservice.microservice":{Microservices:[2,1,1,""]},"seldon.microservice.microservice.Microservices":{create_prediction_microservice:[2,2,1,""],create_recommendation_microservice:[2,2,1,""]},"seldon.microservice.predict":{do_predict:[2,3,1,""],extract_input:[2,3,1,""]},"seldon.microservice.recommend":{do_recommend:[2,3,1,""],extract_input:[2,3,1,""],format_recs:[2,3,1,""],get_data_set:[2,3,1,""],memcache_get:[2,3,1,""]},"seldon.pipeline":{auto_transforms:[3,0,0,"-"],basic_transforms:[3,0,0,"-"],bayes_optimize:[3,0,0,"-"],cross_validation:[3,0,0,"-"],pandas_pipelines:[3,0,0,"-"],sklearn_transform:[3,0,0,"-"],tfidf_transform:[3,0,0,"-"]},"seldon.pipeline.auto_transforms":{Auto_transform:[3,1,1,""]},"seldon.pipeline.auto_transforms.Auto_transform":{fit:[3,2,1,""],transform:[3,2,1,""]},"seldon.pipeline.basic_transforms":{Binary_transform:[3,1,1,""],Exclude_features_transform:[3,1,1,""],Exist_features_transform:[3,1,1,""],Feature_id_transform:[3,1,1,""],Include_features_transform:[3,1,1,""],Split_transform:[3,1,1,""],Svmlight_transform:[3,1,1,""]},"seldon.pipeline.basic_transforms.Binary_transform":{fit:[3,2,1,""],transform:[3,2,1,""]},"seldon.pipeline.basic_transforms.Exclude_features_transform":{fit:[3,2,1,""],transform:[3,2,1,""]},"seldon.pipeline.basic_transforms.Exist_features_transform":{fit:[3,2,1,""],transform:[3,2,1,""]},"seldon.pipeline.basic_transforms.Feature_id_transform":{fit:[3,2,1,""],transform:[3,2,1,""]},"seldon.pipeline.basic_transforms.Include_features_transform":{fit:[3,2,1,""],transform:[3,2,1,""]},"seldon.pipeline.basic_transforms.Split_transform":{fit:[3,2,1,""],transform:[3,2,1,""]},"seldon.pipeline.basic_transforms.Svmlight_transform":{fit:[3,2,1,""],transform:[3,2,1,""]},"seldon.pipeline.bayes_optimize":{BayesOptimizer:[3,1,1,""]},"seldon.pipeline.bayes_optimize.BayesOptimizer":{"__getstate__":[3,2,1,""],fit:[3,2,1,""],get_best_score:[3,2,1,""],get_class_id_map:[3,2,1,""],predict_proba:[3,2,1,""],score:[3,2,1,""],transform:[3,2,1,""]},"seldon.pipeline.cross_validation":{Seldon_KFold:[3,1,1,""]},"seldon.pipeline.cross_validation.Seldon_KFold":{fit:[3,2,1,""],get_class_id_map:[3,2,1,""],get_score:[3,2,1,""],get_scores:[3,2,1,""],predict_proba:[3,2,1,""],set_params:[3,2,1,""],transform:[3,2,1,""]},"seldon.pipeline.pandas_pipelines":{BasePandasEstimator:[3,1,1,""]},"seldon.pipeline.pandas_pipelines.BasePandasEstimator":{close:[3,2,1,""],convert_dataframe:[3,2,1,""],convert_numpy:[3,2,1,""],create_class_id_map:[3,2,1,""],encode_onehot:[3,2,1,""],get_class_id_map:[3,2,1,""],get_target:[3,2,1,""],predict:[3,2,1,""],set_class_id_map:[3,2,1,""]},"seldon.pipeline.sklearn_transform":{sklearn_transform:[3,1,1,""]},"seldon.pipeline.sklearn_transform.sklearn_transform":{fit:[3,2,1,""],transform:[3,2,1,""]},"seldon.pipeline.tfidf_transform":{Tfidf_transform:[3,1,1,""]},"seldon.pipeline.tfidf_transform.Tfidf_transform":{fit:[3,2,1,""],get_tokens:[3,2,1,""],transform:[3,2,1,""]},"seldon.sklearn_estimator":{SKLearnClassifier:[1,1,1,""]},"seldon.sklearn_estimator.SKLearnClassifier":{fit:[1,2,1,""],predict:[1,2,1,""],predict_proba:[1,2,1,""]},"seldon.text":{docsim:[4,0,0,"-"]},"seldon.text.docsim":{DefaultJsonCorpus:[4,1,1,""],DocumentSimilarity:[4,1,1,""],current_milli_time:[4,3,1,""],jaccard:[4,3,1,""]},"seldon.text.docsim.DefaultJsonCorpus":{get_dictionary:[4,2,1,""],get_json:[4,2,1,""],get_meta:[4,2,1,""],get_texts:[4,2,1,""],getstream:[4,2,1,""]},"seldon.text.docsim.DocumentSimilarity":{"__getstate__":[4,2,1,""],create_gensim_model:[4,2,1,""],create_sklearn_model:[4,2,1,""],fit:[4,2,1,""],load:[4,2,1,""],nn:[4,2,1,""],recommend:[4,2,1,""],save:[4,2,1,""],score:[4,2,1,""]},"seldon.util":{Recommender:[1,1,1,""],Recommender_wrapper:[1,1,1,""]},"seldon.util.Recommender":{load:[1,2,1,""],recommend:[1,2,1,""],save:[1,2,1,""]},"seldon.util.Recommender_wrapper":{create_work_folder:[1,2,1,""],get_work_folder:[1,2,1,""],load_recommender:[1,2,1,""],save_recommender:[1,2,1,""]},"seldon.vw":{VWClassifier:[1,1,1,""]},"seldon.vw.VWClassifier":{"__getstate__":[1,2,1,""],"__setstate__":[1,2,1,""],close:[1,2,1,""],fit:[1,2,1,""],predict_proba:[1,2,1,""]},"seldon.xgb":{XGBoostClassifier:[1,1,1,""]},"seldon.xgb.XGBoostClassifier":{fit:[1,2,1,""],predict_proba:[1,2,1,""]},seldon:{NullHandler:[1,1,1,""],fileutil:[1,0,0,"-"],keras:[1,0,0,"-"],microservice:[2,0,0,"-"],pipeline:[3,0,0,"-"],sklearn_estimator:[1,0,0,"-"],text:[4,0,0,"-"],util:[1,0,0,"-"],vw:[1,0,0,"-"],xgb:[1,0,0,"-"]}},objnames:{"0":["py","module","Python module"],"1":["py","class","Python class"],"2":["py","method","Python method"],"3":["py","function","Python function"]},objtypes:{"0":"py:module","1":"py:class","2":"py:method","3":"py:function"},terms:{"__getstate__":[1,3,4],"__setstate__":1,"boolean":[1,3],"class":[1,2,3,4],"default":[1,3,4],"final":3,"float":[1,3],"function":1,"int":[1,2,3,4],"long":[1,4],"new":3,"return":[1,3,4],"true":[1,3,4],"try":3,"while":1,accuraci:4,adam:1,add:1,against:3,algorithm:3,all:[1,3],allow:[1,2,3],alpha:[1,4],ani:[2,3,4],annoi:4,annoy_tre:4,anoth:3,app:2,appli:3,approx:4,arg:[1,4],argument:1,arrai:[1,3],assum:[3,4],auto_transform:[0,1],automat:3,avg:4,aws_kei:[1,2],aws_secret:[1,2],back:[1,3],balanc:1,base:[1,2,3,4],base_scor:1,baseestim:[1,3],basefold:1,basepandasestim:[1,3],basic:3,basic_transform:[0,1],bayes_optim:[0,1],bayesianoptim:3,bayesoptim:3,befor:3,between:3,bia:1,binari:3,binary_transform:3,blob:1,bool:[3,4],bool_map:3,boost:1,bucket:1,busi:1,call:[1,2,3],callback:1,can:[1,3],cat_missing_v:3,cat_missing_valu:3,categor:3,categorical_crossentropi:1,caus:1,caveat:1,ch2:3,chi:3,child:1,classif:[1,3],classifi:[1,3],classifiermixin:1,clf:[1,3],client:[1,4],close:[1,3],cnvert:1,col:3,colsample_bylevel:1,colsample_bytre:1,column:[1,3],com:1,comma:2,compani:1,compat:3,compil:1,complex:1,concaten:3,config:2,connect:1,construct:[1,2],content:0,control:1,convers:3,convert:[1,3],convert_datafram:3,convert_numpi:3,copi:1,copy_loc:1,copy_s3_fil:1,corpu:4,correspond:1,cound:3,count:3,creat:[1,2,3,4],create_class_id_map:3,create_date_differ:3,create_gensim_model:4,create_prediction_microservic:2,create_recommendation_microservic:2,create_sklearn_model:4,create_work_fold:1,creation:2,cross:3,cross_valid:[0,1],current_milli_tim:4,custom:3,custom_date_format:3,cv_fold:3,dai:1,data:[1,2,3,4],datafram:[1,2,3],dataset:3,date:3,date_col:3,date_transform:3,datfram:3,day_of_week:3,decompress:1,default_classification_model:1,defaultjsoncorpu:4,delta:1,depth:1,deriv:1,descript:[1,3],destin:1,df_base:3,dict:[1,3,4],dictionari:3,differ:3,distanc:4,dmlc:1,do_predict:2,do_recommend:2,doc_id:4,docsim:[0,1],documentsimilar:4,doe:1,download:1,download_s3:1,drop:3,each:[1,3],easi:1,easili:1,emit:1,encod:3,encode_onehot:3,endpoint:2,english:4,enough:3,estim:[1,3],eta:1,exampl:3,exclud:[1,3],exclude_features_transform:3,exclude_miss:3,exist:[1,3],exist_features_transform:3,exlud:3,express:3,extern:[1,4],extra:1,extract:2,extract_input:2,fals:[1,3,4],fchollet:1,featur:[1,3],feature_id_transform:3,feature_names_support:3,file:[1,2,4],filenam:1,fileutil:0,fill:3,filter:3,fine:1,first:3,fit:[1,3,4],flask:2,fname:3,fold:3,folder:[1,4],follow:[1,4],forc:3,force_categor:3,fork:1,form:3,format:[1,3],format_rec:2,frame:3,frequenc:3,from:[1,2,3,4],frompath:1,further:1,gamma:1,gener:1,gensim:4,gensim_lda:4,gensim_lsi:4,gensim_rp:4,get:[2,3],get_best_scor:3,get_class_id_map:3,get_data_set:2,get_dictionari:4,get_json:4,get_meta:4,get_scor:3,get_target:3,get_text:4,get_token:3,get_work_fold:1,getfold:1,getstream:4,github:1,given:[1,3,4],global:1,grain:1,ground:4,group:1,gzip:1,gzipe:1,handl:[1,3,4],handler:1,have:3,help:3,hessian:1,high:[1,3],hold:1,hot:3,hour:3,http:1,id_map:[1,3],idf:3,ignor:3,ignore_numb:3,ignore_v:3,includ:[1,3],include_features_transform:3,inclus:1,index:0,initi:1,input:[1,3,4],input_featur:3,input_width:1,inputpath:1,instanc:1,interact:1,interfac:1,intern:[3,4],invers:3,issu:1,item:[1,2],item_id:1,iter:1,jaccard:4,johnlangford:1,json:[2,4],keep:3,kei:[1,2],kept:3,kera:0,kerasclassifi:1,l1_ratio:4,label:[1,3],lambda:1,leaf:1,learn:[1,3],learner:1,learning_r:1,level:[1,3],like:[1,3],limit:[1,3,4],line:1,linear:1,list:[1,3,4],load:[1,4],load_recommend:1,local:1,locat:[1,2,4],log:1,loss:1,make:1,mani:3,map:[1,2,3],master:1,matrix:3,max:3,max_cat_perc:3,max_delta_step:1,max_depth:1,max_df:3,max_values_numeric_categor:3,maximum:1,mayb:1,memcach:2,memcache_get:2,memcache_pool_s:2,memcache_serv:2,merg:3,messag:1,meta:4,method:[3,4],metric:4,microservic:[0,1],min:3,min_cat_perc:3,min_child_weight:1,min_df:3,min_siz:3,minimum:[1,3],miss:[1,3],mode:1,model:[1,2,3,4],model_cr:1,model_fil:1,model_nam:2,model_typ:4,modul:0,month:3,more:[1,3],multilpl:1,must:4,n_estim:1,n_output:1,n_sampl:1,name:[1,2,3],nan:[1,3],nan_threshold:3,nb_epoch:1,nearest:4,need:[1,3,4],neg:1,neighbour:4,nmf:4,node:1,none:[1,2,3,4],normalzi:3,noth:3,nthread:1,nullhandl:1,num_class:1,num_iter:1,number:[1,3,4],numdai:1,numer:3,numpi:3,obj:3,object:[1,2,3,4],occurr:3,onli:3,optim:[1,3],optin:3,option:[1,2,3,4],output:[1,3],output_featur:3,output_features_prefix:3,over:1,packag:0,page:0,pair:[1,4],panda:[1,3],pandas_pipelin:[0,1],parallel:1,param:3,param_int:3,param_rang:3,paramet:[1,2,3,4],part:1,partit:1,pass:[1,3,4],path:1,percent:3,percentag:3,pickl:[1,3,4],pid:1,pid_fil:1,pipelin:[0,1,2],pipeline_fold:2,place:3,pool:2,posit:1,predict:[0,1],predict_proba:[1,3],prefix:1,present:[1,3],print:1,proba:1,probabl:1,process:1,product:1,provid:[2,3,4],push:1,python:1,queri:4,random:1,random_st:4,rang:[1,3,4],rate:1,ratio:1,raw:[1,4],raw_data:2,raw_predict:1,raw_predictions_fil:1,readabl:3,rec:2,recent:1,recent_interact:[1,4],recommed:2,recommend:[0,1],recommender_fold:[1,2],recommender_wrapp:1,record:1,recreat:1,reduct:1,reg:1,reg_alpha:1,reg_lambda:1,regular:[1,3],remov:[1,3,4],repres:3,requir:[1,3],respons:2,result:[2,3,4],row:3,run:[1,3,4],sampl:[1,3],satisfi:4,save:[1,4],save_recommend:1,save_resum:1,scale_pos_weight:1,scikit:[1,3],scikit_learn:1,score:[1,2,3,4],search:[0,4],secret:[1,2],seed:1,seem:1,seldon_kfold:3,select:3,select_featur:3,self:[1,3],send:1,separ:2,server:[1,2],set:[1,3],set_class_id_map:3,set_param:3,setstat:1,shape:1,should:[1,3,4],show_accuraci:1,shuffl:1,shutdown:1,silent:1,similar:4,simpl:3,size:[2,4],sk_arg:1,sklear_nmf_arg:4,sklearn:[1,3,4],sklearn_estim:0,sklearn_nmf:4,sklearn_nmf_arg:4,sklearn_tfidf_arg:4,sklearn_transform:[0,1],sklearnclassifi:1,sort:3,sourc:[1,2,3,4],specid:3,specif:1,specifi:[1,3],split:[1,3],split_express:3,split_transform:3,squar:3,start:[1,3],startdai:1,state:1,step:1,stop:3,stop_word:[3,4],store:1,str:[1,2,3,4],stream:1,stream_decompress:1,stream_gzip:1,stream_loc:1,stream_multi:1,stream_s3:1,stream_text:1,string:[1,2,3,4],submodul:0,subpackag:0,subsampl:1,sum:1,support:1,svmlight_featur:1,svmlight_transform:3,tag:4,take:3,target:[1,3],target_featur:3,target_read:[1,3],task:1,term:[1,3],termin:1,test:[1,3],test_batch_s:1,text:[0,1,3],textcorpu:4,tfidf:3,tfidf_transform:[0,1],tfidfvector:4,than:1,thei:4,them:[1,3],thi:[2,4],thing:[1,3,4],thread:1,threshold:3,titl:4,tmp:[1,4],tmp_model:1,token:4,too:3,tool:3,top:3,topath:1,topn_featur:3,train:[1,3,4],train_batch_s:1,transform:3,transformermixin:3,translat:4,translate_id:4,trasform:3,treat:3,tree:[1,4],truth:4,type:[1,3,4],ukn:3,under:1,uniqu:3,unless:3,upload:1,upload_s3:1,url:1,user:[1,4],util:0,valid:3,validation_data:1,validation_split:1,valu:[1,3],variabl:[1,3],vec:3,vec_siz:4,vector:[1,3,4],verbos:1,version:[1,3],via:1,vowpal:1,vowpal_wabb:1,vowpal_wabbit:1,vw_arg:1,vw_pid_fil:1,vwclassifi:1,wabbit:1,wabbit_wappa:1,weight:1,when:1,whether:[1,3],which:[1,3],without:1,word:3,work_fold:[1,4],would:1,wrapper:[1,3],xgb:0,xgboost:1,xgboostclassifi:1,year:3,yield:4,zero:3,zero_bas:3},titles:["Welcome to seldon&#8217;s documentation!","seldon package","seldon.microservice package","seldon.pipeline package","seldon.text package"],titleterms:{auto_transform:3,basic_transform:3,bayes_optim:3,content:[1,2,3,4],cross_valid:3,docsim:4,document:0,fileutil:1,indic:0,kera:1,microservic:2,modul:[1,2,3,4],packag:[1,2,3,4],pandas_pipelin:3,pipelin:3,predict:2,recommend:2,seldon:[0,1,2,3,4],sklearn_estim:1,sklearn_transform:3,submodul:[1,2,3,4],subpackag:1,tabl:0,text:4,tfidf_transform:3,util:1,welcom:0,xgb:1}})